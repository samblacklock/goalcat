import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCardActions } from "./goal-card-actions";
import { incrementGoal, decrementGoal } from "@/app/actions/events";
import Link from "next/link";
import { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  console.log("goal", goal);
  const progress = (goal.count / goal.target) * 100;

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg select-none flex gap-2 bg-gradient-to-br from-[var(--card-color)] to-[var(--card-color-dark)]"
      style={
        {
          "--card-color": goal.color,
          "--card-color-dark": goal.color + "88",
        } as React.CSSProperties
      }
    >
      <Link href={`/goals/${goal.id}`} className="block w-full">
        <CardHeader>
          <div className="flex justify-between items-center drop-shadow-sm">
            <CardTitle className="text-white text-2xl font-bold truncate w-4/5">
              {goal.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-4 bg-white/30" />
          <div className="mt-4 flex justify-between items-center text-white">
            <p className="text-lg font-semibold">
              {goal.count} / {goal.target}
            </p>
          </div>
        </CardContent>
      </Link>
      <GoalCardActions
        id={goal.id}
        name={goal.name}
        onIncrement={incrementGoal}
        onDecrement={decrementGoal}
      />
    </Card>
  );
}
