import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/utils/supabase/createServerSupabaseClient";

const client = createServerSupabaseClient();

export async function getUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data, error } = await client
    .from("users")
    .upsert({ user_id: userId }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
