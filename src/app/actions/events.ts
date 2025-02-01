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

export async function getGoalEvents(goalId: string) {
  const supabase = useServerSupabaseClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("goal_id", goalId)
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return data;
}
