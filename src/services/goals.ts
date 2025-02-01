import { createServerSupabaseClient } from "@/utils/supabase/createServerSupabaseClient";

type Goal = {
  id: string;
  name: string;
  target: number;
  user_id: string;
  count: number;
};

const client = createServerSupabaseClient();

export async function getGoals() {
  const { data, error } = await client
    .from("goals")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createGoal(goal: Omit<Goal, "id" | "count">) {
  const { data, error } = await client
    .from("goals")
    .insert(goal)
    .select()
    .single();

  if (error) throw error;
  return data;
}
