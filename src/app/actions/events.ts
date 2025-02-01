"use server";

import { useServerSupabaseClient } from "@/hooks/useServerSupabaseClient";
import { revalidatePath } from "next/cache";

export type EventType = "INCREMENT" | "DECREMENT";

export async function incrementGoal(goalId: string) {
  const supabase = useServerSupabaseClient();

  const { error } = await supabase.from("events").insert({
    goal_id: goalId,
    type: "INCREMENT" as EventType,
    description: "Incremented goal",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/goals");
}

export async function decrementGoal(goalId: string) {
  const supabase = useServerSupabaseClient();

  const { error } = await supabase.from("events").insert({
    goal_id: goalId,
    type: "DECREMENT" as EventType,
    description: "Decremented goal",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/goals");
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
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, count };
}

export async function updateEventDescription(
  eventId: string,
  description: string
) {
  const supabase = useServerSupabaseClient();

  console.log("updateEventDescription", eventId, description);

  const { error } = await supabase
    .from("events")
    .update({ description })
    .eq("id", eventId);

  if (error) throw error;
  revalidatePath("/goals");
}
