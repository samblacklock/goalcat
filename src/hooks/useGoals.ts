import { useState, useEffect } from "react";
import { useSupabaseClient } from "./useSupabaseClient";
import { useSession } from "@clerk/nextjs";

type Goal = {
  id: string;
  name: string;
  target: number;
  user_id: string;
  count: number;
};

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const client = useSupabaseClient();
  const { session } = useSession();

  useEffect(() => {
    if (!session) return;

    const channel = client
      .channel("goals")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "events",
        },
        (payload) => {
          console.log("Goal updated:", payload.new);
        }
      )
      .subscribe((status) => {
        console.log("Channel status:", status);
      });

    return () => {
      void channel.unsubscribe();
    };
  }, [session, client]);

  useEffect(() => {
    if (!session) return;
    loadGoals();
  }, [session]);

  async function loadGoals() {
    setLoading(true);
    const { data, error } = await client
      .from("goals")
      .select()
      .order("created_at", { ascending: false });

    if (!error) setGoals(data || []);
    setLoading(false);
  }

  async function subscribeToGoals() {
    // Create a function to handle inserts
    const handleInserts = (payload) => {
      console.log("Change received!", payload);
    };

    client
      .channel("goals")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "goals" },
        handleInserts
      )
      .subscribe();
  }

  async function createGoal(goal: Omit<Goal, "id" | "count">) {
    const { data, error } = await client
      .from("goals")
      .insert(goal)
      .select()
      .single();

    if (!error && data) {
      setGoals((prev) => [data, ...prev]);
      return data;
    }
  }

  subscribeToGoals();

  return {
    goals,
    loading: loading || !session,
    createGoal,
    refreshGoals: loadGoals,
  };
}
