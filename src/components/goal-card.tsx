import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCardActions } from "./goal-card-actions";
import { incrementGoal, decrementGoal } from "@/app/actions/goals";
import Link from "next/link";

interface GoalCardProps {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  color?: string;
}

export function GoalCard({
  id,
  title,
  currentValue,
  targetValue,
  color = "#000000",
}: GoalCardProps) {
  const progress = (currentValue / targetValue) * 100;

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg select-none flex gap-2"
      style={{ backgroundColor: color }}
    >
      <Link href={`/goals/${id}`} className="block w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-2xl font-bold truncate w-4/5">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-4 bg-white/30" />
          <div className="mt-4 flex justify-between items-center text-white">
            <p className="text-lg font-semibold">
              {currentValue} / {targetValue}
            </p>
          </div>
        </CardContent>
      </Link>
      <GoalCardActions
        id={id}
        onIncrement={incrementGoal}
        onDecrement={decrementGoal}
      />
    </Card>
  );
}
