import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WorkRecord = {
  id: string;
  name: string;
  name_en: string | null;
  story: string | null;
  materials: string | null;
  technique: string | null;
  cover_image: string | null;
  /** JSONB array of public image URLs. Empty works use []. */
  detail_images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
};

/** Read-only connectivity smoke test for the works table. */
export async function readWorks(): Promise<WorkRecord[]> {
  const { data, error } = await supabase.from("works").select("*");

  if (error) {
    throw new Error(`Unable to read works: ${error.message}`);
  }

  return (data ?? []) as WorkRecord[];
}
