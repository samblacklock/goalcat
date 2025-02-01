import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalCardActions } from "@/components/goal-card-actions";
import { getGoal } from "@/app/actions/goals";
import {
  decrementGoal,
  incrementGoal,
  getGoalEvents,
  updateEventDescription,
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EditableDescription from "@/components/editable-event-description";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GoalPage({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  let goal;
  let events;
  let totalEvents;
  try {
    goal = await getGoal(params.id);
    const eventsData = await getGoalEvents(params.id, currentPage, pageSize);
    events = eventsData.data;
    totalEvents = eventsData.count;
  } catch (error) {
    console.log(error);
    notFound();
  }

  const totalPages = Math.ceil((totalEvents || 0) / pageSize);

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
                  <TableCell>
                    <EditableDescription
                      eventId={event.id}
                      initialDescription={event.description}
                      onUpdate={updateEventDescription}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/goals/${params.id}?page=${currentPage - 1}`}
                      aria-disabled={currentPage <= 1}
                      className={
                        currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {/* First page */}
                  <PaginationItem>
                    <PaginationLink
                      href={`/goals/${params.id}?page=1`}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Show ellipsis if there are many pages before current */}
                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Current page and surrounding pages */}
                  {currentPage > 2 && currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/goals/${params.id}?page=${currentPage}`}
                        isActive={true}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Show ellipsis if there are many pages after current */}
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Last page */}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/goals/${params.id}?page=${totalPages}`}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={`/goals/${params.id}?page=${currentPage + 1}`}
                      aria-disabled={currentPage >= totalPages}
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
