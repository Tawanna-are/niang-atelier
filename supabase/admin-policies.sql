-- Run once in the Supabase SQL Editor after assigning app_metadata.role=admin.
-- Keeps existing public reads. Does not permit anonymous writes.
begin;

alter table public.works enable row level security;

drop policy if exists niang_admin_insert on public.works;
create policy niang_admin_insert on public.works for insert to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Restrictive check also prevents an existing permissive INSERT policy from
-- accidentally allowing non-admin users to create works.
drop policy if exists niang_admin_insert_guard on public.works;
create policy niang_admin_insert_guard on public.works as restrictive
for insert to public
with check (coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false));

drop policy if exists niang_admin_read on public.works;
create policy niang_admin_read on public.works for select to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists niang_admin_image_insert on storage.objects;
create policy niang_admin_image_insert on storage.objects for insert to authenticated
with check (
  bucket_id = 'works-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists niang_admin_image_insert_guard on storage.objects;
create policy niang_admin_image_insert_guard on storage.objects as restrictive
for insert to public with check (
  bucket_id <> 'works-images' or coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and (storage.foldername(name))[1] = (select auth.uid())::text, false)
);

-- SELECT + DELETE allow rollback of a partially uploaded batch.
drop policy if exists niang_admin_image_read on storage.objects;
create policy niang_admin_image_read on storage.objects for select to authenticated
using (bucket_id = 'works-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists niang_admin_image_delete on storage.objects;
create policy niang_admin_image_delete on storage.objects for delete to authenticated
using (bucket_id = 'works-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists niang_admin_image_delete_guard on storage.objects;
create policy niang_admin_image_delete_guard on storage.objects as restrictive
for delete to public using (
  bucket_id <> 'works-images' or coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and (storage.foldername(name))[1] = (select auth.uid())::text, false)
);

commit;
