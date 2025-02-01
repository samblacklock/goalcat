"use server";

import { createServerSupabaseClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/services/users";

export async function createGoal(formData: FormData) {
  const supabase = createServerSupabaseClient();

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
  const supabase = createServerSupabaseClient();

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

export async function deleteGoal(
  id: string
): Promise<{ success: boolean; error?: Error }> {
  const supabase = createServerSupabaseClient();

  try {
    const { error } = await supabase.from("goals").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/goals");
    return { success: true };
  } catch (error) {
    console.error("Error deleting goal:", error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}
