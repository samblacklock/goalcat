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

export async function createGoal(formData: FormData) {
  const supabase = useServerSupabaseClient();
  const { getUser } = useUser();

  const user = await getUser();
  if (!user) throw new Error("User not found");

  const name = formData.get("name") as string;
  const target = parseInt(formData.get("target") as string);
  const color = formData.get("color") as string;

  if (!name || !target || !color) {
    throw new Error("Missing required fields");
  }

  const { error } = await supabase.from("goals").insert({
    name,
    target,
    color,
    count: 0,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/");
}
