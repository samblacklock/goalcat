import { auth } from "@clerk/nextjs/server";
import { useServerSupabaseClient } from "./useServerSupabaseClient";

type DBUser = {
  id: string;
  user_id: string;
  username: string;
  // add other user fields
};

export function useUser() {
  const client = useServerSupabaseClient();

  async function getUser() {
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

  return { getUser };
}
