import { supabase, type WorkRecord } from "@/lib/supabase";

/**
 * Keep the JSONB field at the application boundary as a string array.
 * Supabase accepts this array directly and serializes it as valid JSONB.
 */
export function normalizeDetailImages(value: unknown): string[] {
  const parsed = typeof value === "string"
    ? (() => {
        try {
          return JSON.parse(value) as unknown;
        } catch {
          return [];
        }
      })()
    : value;

  if (!Array.isArray(parsed)) return [];
  return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
}

function normalizeWork(work: WorkRecord): WorkRecord {
  return {
    ...work,
    cover_image: typeof work.cover_image === "string" ? work.cover_image.trim() : work.cover_image,
    detail_images: normalizeDetailImages(work.detail_images),
  };
}

/** Read every work, newest first. */
export async function getWorks(): Promise<WorkRecord[]> {
  const { data, error } = await supabase
    .from("works")
    .select("id, name, name_en, story, materials, technique, cover_image, detail_images, featured, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to read works: ${error.message}`);
  }

  return (data ?? []).map((work) => normalizeWork(work as WorkRecord));
}

/** Read only works marked for featured placement, newest first. */
export async function getFeaturedWorks(): Promise<WorkRecord[]> {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to read featured works: ${error.message}`);
  }

  return (data ?? []).map((work) => normalizeWork(work as WorkRecord));
}

export async function getWorkById(id: string): Promise<WorkRecord | null> {
  // The works primary key is a UUID. Invalid route IDs are not found,
  // rather than being sent to PostgreSQL and causing a query error.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }

  const { data, error } = await supabase
    .from("works")
    .select("id, name, name_en, story, materials, technique, cover_image, detail_images, featured, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Unable to read work: ${error.message}`);
  if (!data) return null;
  return normalizeWork(data as WorkRecord);
}
