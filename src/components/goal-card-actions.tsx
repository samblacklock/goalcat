"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GoalCardActionsProps {
  id: string;
  name: string;
  onIncrement: (id: string) => Promise<void>;
  onDecrement: (id: string) => Promise<void>;
}

export function GoalCardActions({
  id,
  name,
  onIncrement,
  onDecrement,
}: GoalCardActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await onIncrement(id);
      toast.success(`${name} incremented`);
    } catch (error) {
      toast.error(`Failed to increment ${name}`, {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await onDecrement(id);
      toast.success(`${name} decremented`);
    } catch (error) {
      toast.error(`Failed to decrement ${name}`, {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-32 h-full"
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin text-black" />
      ) : (
        <>
          <Button
            size="lg"
            variant="secondary"
            className="h-1/2 hover:bg-white/30 rounded-none border-b border-white/90 flex-1 w-full opacity-50"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-1/2 hover:bg-white/30 rounded-none flex-1 w-full opacity-50"
            onClick={handleDecrement}
            disabled={isLoading}
          >
            <Minus className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
}
