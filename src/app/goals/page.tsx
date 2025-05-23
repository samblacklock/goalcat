import { AddGoalButton } from "@/components/add-goal-button";
import { GoalCard } from "@/components/goal-card";
import { SignOutButton } from "@/components/sign-out-button";
import { getGoals } from "@/services/goals";
import { getUser } from "@/services/users";
import Link from "next/link";

export default async function GoalsPage() {
  const [goals, user] = await Promise.all([getGoals(), getUser()]);

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1>Welcome, {user?.username}</h1>
        <SignOutButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {goals && goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
        {goals && goals.length === 0 && (
          <p>No goals found. Add a goal to get started.</p>
        )}
        <Link href="/goals/new" className="h-full">
          <AddGoalButton />
        </Link>
      </div>
    </div>
  );
}
