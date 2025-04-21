import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalCardActions } from "@/components/goal-card-actions";
import { decrementGoal, incrementGoal } from "@/app/actions/events";
import { deleteGoal } from "@/app/actions/goals";
import { Goal } from "@/types";
import { DeleteGoalButton } from "./delete-goal-button";

interface GoalProgressCardProps {
  goal: Goal;
}

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const progress = (goal.count / goal.target) * 100;

  return (
    <Card
      className="bg-gradient-to-br from-[var(--card-color)] to-[var(--card-color-dark)]"
      style={
        {
          "--card-color": goal.color,
          "--card-color-dark": goal.color + "aa",
        } as React.CSSProperties
      }
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-4xl font-bold">{goal.name}</CardTitle>
          <span className="text-sm opacity-75">
            Created on {new Date(goal.created_at).toLocaleDateString()}
          </span>
        </div>
        <DeleteGoalButton
          goalId={goal.id}
          goalName={goal.name}
          onDelete={deleteGoal}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-stretch justify-between h-32">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Progress</h2>
            <p className="text-6xl font-bold">
              {goal.count}{" "}
              <span className="text-2xl opacity-75">/ {goal.target}</span>
            </p>
          </div>
          <GoalCardActions
            id={goal.id}
            name={goal.name}
            onIncrement={incrementGoal}
            onDecrement={decrementGoal}
          />
        </div>

        <Progress value={progress} className="h-3" />

        <div className="flex justify-between text-sm opacity-75">
          <span>{goal.count}</span>
          <span>{goal.target}</span>
        </div>
      </CardContent>
    </Card>
  );
}
