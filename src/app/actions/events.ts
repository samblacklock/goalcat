"use server";

import { useServerSupabaseClient } from "@/hooks/useServerSupabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EventType } from "./goals.types";
import { useUser } from "@/hooks/useUser";

export async function incrementGoal(goalId: string) {
  const supabase = useServerSupabaseClient();

  const { error } = await supabase.from("events").insert({
    goal_id: goalId,
    type: "INCREMENT" as EventType,
    description: "Incremented goal",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function decrementGoal(goalId: string) {
  const supabase = useServerSupabaseClient();

  const { error } = await supabase.from("events").insert({
    goal_id: goalId,
    type: "DECREMENT" as EventType,
    description: "Decremented goal",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function getGoalEvents(
  goalId: string,
  page: number = 1,
  pageSize: number = 10
) {
  const supabase = useServerSupabaseClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("events")
    .select("*", { count: "exact" })
    .eq("goal_id", goalId)
    .order("timestamp", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, count };
}
