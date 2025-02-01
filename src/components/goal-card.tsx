import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCardActions } from "./goal-card-actions";
import { incrementGoal, decrementGoal } from "@/app/actions/events";
import Link from "next/link";
import { Goal } from "@/types";

type GoalCardProps = Pick<Goal, "id" | "name" | "count" | "target" | "color">;

export function GoalCard({
  id,
  name,
  count,
  target,
  color = "#000000",
}: GoalCardProps) {
  const progress = (count / target) * 100;

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg select-none flex gap-2 bg-gradient-to-br from-[var(--card-color)] to-[var(--card-color-dark)]"
      style={
        {
          "--card-color": color,
          "--card-color-dark": color + "88",
        } as React.CSSProperties
      }
    >
      <Link href={`/goals/${id}`} className="block w-full">
        <CardHeader>
          <div className="flex justify-between items-center drop-shadow-sm">
            <CardTitle className="text-white text-2xl font-bold truncate w-4/5">
              {name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-4 bg-white/30" />
          <div className="mt-4 flex justify-between items-center text-white">
            <p className="text-lg font-semibold">
              {count} / {target}
            </p>
          </div>
        </CardContent>
      </Link>
      <GoalCardActions
        id={id}
        name={name}
        onIncrement={incrementGoal}
        onDecrement={decrementGoal}
      />
    </Card>
  );
}
