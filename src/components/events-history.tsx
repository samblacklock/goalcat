import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { updateEventDescription } from "@/app/actions/events";
import { Event } from "@/types";

interface EventsHistoryProps {
  events: Event[];
  currentPage: number;
  totalPages: number;
  goalId: string;
}

export function EventsHistory({
  events,
  currentPage,
  totalPages,
  goalId,
}: EventsHistoryProps) {
  return (
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
                  {new Date(event.created_at).toLocaleString()}
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
                    href={`/goals/${goalId}?page=${currentPage - 1}`}
                    aria-disabled={currentPage <= 1}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href={`/goals/${goalId}?page=1`}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage > 2 && currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/goals/${goalId}?page=${currentPage}`}
                      isActive={true}
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/goals/${goalId}?page=${totalPages}`}
                      isActive={currentPage === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href={`/goals/${goalId}?page=${currentPage + 1}`}
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
  );
}
