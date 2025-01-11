"use client";
import { useDBUser } from "../hooks/useUser";
import { useGoals } from "../hooks/useGoals";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";

export default function Home() {
  const { user, loading: userLoading } = useDBUser();
  const { goals, loading: goalsLoading, createGoal } = useGoals();
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const client = useSupabaseClient();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    await createGoal({
      name: newGoalName,
      target: parseInt(newGoalTarget),
      user_id: user.id,
    });

    setNewGoalName("");
    setNewGoalTarget("");
  }

  const logProgress = useCallback(
    async (goalId: string, goalName: string) => {
      const { error } = await client.from("events").insert({
        goal_id: goalId,
        description: `${goalName} was recorded`,
      });

      if (error) {
        console.error("Error logging progress:", error);
      }
    },
    [client]
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Username: {user?.username}</p>
          <p>User ID: {user?.user_id}</p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Create New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="Read more books..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Number</Label>
              <Input
                id="target"
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="12"
                required
              />
            </div>

            <Button type="submit">Add Goal</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {goalsLoading ? (
            <p>Loading goals...</p>
          ) : goals.length === 0 ? (
            <p className="text-muted-foreground">No goals yet!</p>
          ) : (
            <div className="space-y-2">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex justify-between p-4 border rounded-lg"
                >
                  <div className="flex-grow">
                    <span className="font-medium">{goal.name}</span>
                    <div className="text-muted-foreground">
                      <span>
                        Progress: {goal.count}
                        {goal.target ? ` / ${goal.target}` : ""}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => logProgress(goal.id, goal.name)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Log Progress</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
