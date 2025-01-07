import { AddGoalButton } from "./add-goal-button";
import { GoalCard } from "./goal-card";

export function GoalTracker() {
  // This is just example data. In a real app, you'd fetch this from your backend.
  const goals = [
    {
      id: "1",
      title: "Read 12 books",
      currentValue: 3,
      targetValue: 12,
      color: "#FF6B6B",
    },
    {
      id: "2",
      title: "Exercise 150 hours",
      currentValue: 50,
      targetValue: 150,
      color: "#4ECDC4",
    },
    {
      id: "3",
      title: "Learn Spanish",
      currentValue: 30,
      targetValue: 100,
      color: "#45B7D1",
    },
    {
      id: "4",
      title: "Save $5000",
      currentValue: 2000,
      targetValue: 5000,
      color: "#FFA07A",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          id={goal.id}
          title={goal.title}
          currentValue={goal.currentValue}
          targetValue={goal.targetValue}
          color={goal.color}
        />
      ))}
      <AddGoalButton />
    </div>
  );
}
