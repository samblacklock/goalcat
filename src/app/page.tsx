import { GoalTracker } from "@/components/goal-tracker";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 pb-20 gap-16 sm:p-20">
      Hello {user?.username || "there"}!
      <GoalTracker />
    </div>
  );
}
