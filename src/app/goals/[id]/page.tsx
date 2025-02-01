import { getGoal } from "@/app/actions/goals";
import { getGoalEvents } from "@/app/actions/events";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GoalProgressCard } from "@/components/goal-progress-card";
import { EventsHistory } from "@/components/events-history";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GoalPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Link href="/goals">
        <Button>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>

      <GoalProgressCard goal={goal} />

      <EventsHistory
        events={events}
        currentPage={currentPage}
        totalPages={totalPages}
        goalId={params.id}
      />
    </div>
  );
}
