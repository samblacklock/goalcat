import { GoalCard } from "@/components/goal-card";
import { useGoals } from "@/hooks/useGoals";
import { useUser } from "@/hooks/useUser";

export default async function Home() {
  const { getGoals } = useGoals();
  const { getUser } = useUser();

  const goals = await getGoals();
  const user = await getUser();

  return (
    <div>
      <h1>User: {user?.username}</h1>
      <h1>Goals</h1>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          id={goal.id}
          title={goal.name}
          currentValue={goal.count}
          targetValue={goal.target}
          color="#000"
        />
      ))}
    </div>
  );
}
