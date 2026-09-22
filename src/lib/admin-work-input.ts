export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_DETAIL_IMAGES = 12;

export function validateImages(cover: File | undefined, details: File[]): void {
  if (!cover) throw new Error("请选择作品主图。");
  if (details.length > MAX_DETAIL_IMAGES) throw new Error("详情图片最多选择 12 张。");
  for (const file of [cover, ...details]) {
    if (!IMAGE_TYPES[file.type]) throw new Error(`${file.name}：仅支持 JPG、PNG、WEBP。`);
    if (!file.size || file.size > MAX_IMAGE_BYTES) throw new Error(`${file.name}：图片大小需在 0–10 MB 之间。`);
  }
}

export type WorkDraft = {
  name: string;
  name_en: string;
  technique: string;
  materials: string;
  story: string;
};

export function buildWorkPayload(draft: WorkDraft, cover: string, details: string[]) {
  if (!draft.name.trim()) throw new Error("请填写作品名称。");
  if (!cover.trim()) throw new Error("作品主图尚未上传完成。");
  return {
    name: draft.name.trim(),
    name_en: draft.name_en.trim() || null,
    technique: draft.technique.trim() || null,
    materials: draft.materials.trim() || null,
    story: draft.story.trim() || null,
    cover_image: cover,
    // Pass an actual array to Supabase; never JSON.stringify a JSONB field.
    detail_images: details.map((url) => url.trim()).filter(Boolean),
    featured: false,
  };
}
