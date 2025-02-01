"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface GoalCardActionsProps {
  id: string;
  onIncrement: (id: string) => Promise<void>;
  onDecrement: (id: string) => Promise<void>;
}

export function GoalCardActions({
  id,
  onIncrement,
  onDecrement,
}: GoalCardActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await onIncrement(id);
    } catch (error) {
      console.error("Failed to increment goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await onDecrement(id);
    } catch (error) {
      console.error("Failed to decrement goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-32" onClick={(e) => e.stopPropagation()}>
      <Button
        size="lg"
        variant="secondary"
        className="h-10 w-10 hover:bg-white/30 rounded-none border-b border-white/90 flex-1 w-full opacity-50"
        onClick={handleIncrement}
        disabled={isLoading}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className="h-10 w-10 hover:bg-white/30 rounded-none flex-1 w-full opacity-50"
        onClick={handleDecrement}
        disabled={isLoading}
      >
        <Minus className="h-6 w-6" />
      </Button>
    </div>
  );
}
