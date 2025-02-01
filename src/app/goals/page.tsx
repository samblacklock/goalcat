import { AddGoalButton } from "@/components/add-goal-button";
import { GoalCard } from "@/components/goal-card";
import { SignOutButton } from "@/components/sign-out-button";
import { useGoals } from "@/hooks/useGoals";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default async function GoalsPage() {
  const { getGoals } = useGoals();
  const { getUser } = useUser();

  const goals = await getGoals();
  const user = await getUser();

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1>Welcome, {user?.username}</h1>
        <SignOutButton />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {goals && goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
        {goals && goals.length === 0 && (
          <p>No goals found. Add a goal to get started.</p>
        )}
        <Link href="/goals/new">
          <AddGoalButton />
        </Link>
      </div>
    </div>
  );
}
