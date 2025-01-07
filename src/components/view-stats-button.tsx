"use client";

import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewStatsButtonProps {
  goalId: string;
}

export function ViewStatsButton({ goalId }: ViewStatsButtonProps) {
  const handleClick = () => {
    // This is where you would implement the navigation to the stats page
    console.log(`Viewing stats for goal ${goalId}`);
  };

  return (
    <Button variant="outline" onClick={handleClick} className="w-full">
      <BarChart className="mr-2 h-4 w-4" /> View Stats
    </Button>
  );
}
