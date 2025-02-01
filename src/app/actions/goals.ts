"use server";

import { useServerSupabaseClient } from "@/hooks/useServerSupabaseClient";
import { revalidatePath } from "next/cache";
import { EventType } from "./goals.types";

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
