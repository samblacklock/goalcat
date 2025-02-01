"use server";

import { useServerSupabaseClient } from "@/hooks/useServerSupabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EventType } from "./goals.types";
import { useUser } from "@/hooks/useUser";

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

export async function getGoal(id: string) {
  const supabase = useServerSupabaseClient();

  const { data: goal, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Failed to fetch goal");
  }

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
}
