import { useState, useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { useSupabaseClient } from "./useSupabaseClient";

type DBUser = {
  id: string;
  user_id: string;
  username: string;
  // add other user fields
};

export function useDBUser() {
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: clerkUser } = useClerkUser();
  const client = useSupabaseClient();

  useEffect(() => {
    if (!clerkUser) return;

    async function upsertUser() {
      setLoading(true);
      const { data, error } = await client
        .from("users")
        .upsert(
          {
            user_id: clerkUser?.id,
            username: clerkUser?.username,
          },
          {
            onConflict: "user_id",
          }
        )
        .select()
        .single();

      if (!error) setUser(data);
      setLoading(false);
    }

    upsertUser();
  }, [clerkUser]);

  return { user, loading };
}
