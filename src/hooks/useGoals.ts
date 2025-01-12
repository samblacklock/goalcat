import { useServerSupabaseClient } from "./useServerSupabaseClient";

type Goal = {
  id: string;
  name: string;
  target: number;
  user_id: string;
  count: number;
};

export function useGoals() {
  const client = useServerSupabaseClient();

  async function getGoals() {
    const { data, error } = await client
      .from("goals")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async function createGoal(goal: Omit<Goal, "id" | "count">) {
    const { data, error } = await client
      .from("goals")
      .insert(goal)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return {
    getGoals,
    createGoal,
  };
}
