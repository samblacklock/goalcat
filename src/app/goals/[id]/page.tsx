import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalCardActions } from "@/components/goal-card-actions";
import { getGoal } from "@/app/actions/goals";
import {
  decrementGoal,
  incrementGoal,
  getGoalEvents,
} from "@/app/actions/events";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function GoalPage({ params }: PageProps) {
  let goal;
  let events;
  try {
    goal = await getGoal(params.id);
    events = await getGoalEvents(params.id);
  } catch (error) {
    console.log(error);
    notFound();
  }

  const progress = (goal.current / goal.target) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card
        className="bg-gradient-to-br from-[var(--card-color)] to-[var(--card-color-dark)]"
        style={
          {
            "--card-color": goal.color,
            "--card-color-dark": goal.color + "aa",
          } as React.CSSProperties
        }
      >
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{goal.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
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

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {new Date(event.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{event.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
