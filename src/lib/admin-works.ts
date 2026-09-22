import { supabase } from "@/lib/supabase";
import { buildWorkPayload, IMAGE_TYPES, validateImages, type WorkDraft } from "./admin-work-input";

const BUCKET = "works-images";

export async function createWork(draft: WorkDraft, cover: File | undefined, details: File[]) {
  validateImages(cover, details);
  if (!draft.name.trim()) throw new Error("请填写作品名称。");
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("登录已过期，请重新登录。");
  if (user.app_metadata.role !== "admin") throw new Error("当前账号没有管理员权限。");

  const id = crypto.randomUUID();
  const uploaded: string[] = [];
  // Record the intended path before upload so a timed-out upload can be cleaned up.
  const attempted: string[] = [];
  try {
    for (const file of [cover!, ...details]) {
      const path = `${user.id}/${id}/${crypto.randomUUID()}.${IMAGE_TYPES[file.type]}`;
      attempted.push(path);
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw new Error(`图片上传失败：${error.message}`);
      uploaded.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    }
  } catch (error) {
    const { error: cleanupError } = await supabase.storage.from(BUCKET).remove(attempted);
    const message = error instanceof Error ? error.message : "图片上传失败。";
    throw new Error(message + (cleanupError ? " 已上传图片未能清理，请在 Storage 中检查。" : ""));
  }

  const payload = { id, ...buildWorkPayload(draft, uploaded[0], uploaded.slice(1)) };
  const { error } = await supabase.from("works").insert(payload);
  if (error) {
    // A network timeout can happen after commit. Preserve images and report the
    // generated ID rather than deleting files that a saved work may reference.
    throw new Error(`保存未确认：${error.message}。请先在 works 表检查 ID ${id} 再重试；本次图片已保留在 Storage 的 ${user.id}/${id}/。`);
  }
  return id;
}
