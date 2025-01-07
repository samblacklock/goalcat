"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

interface GoalCardProps {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  color: string;
}

export function GoalCard({
  id,
  title,
  currentValue,
  targetValue,
  color,
}: GoalCardProps) {
  const progress = (currentValue / targetValue) * 100;

  const handleIncrement = () => {
    console.log(`Incrementing goal ${id}`);
    // Here you would implement the logic to increment the goal
  };

  const handleViewStats = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Viewing stats for goal ${id}`);
    // Here you would implement the navigation to stats
  };

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg select-none"
      style={{ backgroundColor: color }}
      onClick={handleIncrement}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-2xl font-bold truncate w-4/5">
            {title}
          </CardTitle>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={handleViewStats}
          >
            <BarChart className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full h-4 bg-white/30" />
        <div className="mt-4 flex justify-between items-center text-white">
          <p className="text-lg font-semibold">
            {currentValue} / {targetValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
