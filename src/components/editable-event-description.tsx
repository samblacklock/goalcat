"use client";

import { Pencil, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function EditableDescription({
  eventId,
  initialDescription,
  onUpdate,
}: {
  eventId: string;
  initialDescription: string;
  onUpdate: (eventId: string, description: string) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Description cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      await onUpdate(eventId, description);
      setIsEditing(false);
      toast.success("Description updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update description");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
          disabled={isLoading}
          className="h-8"
        />
        <Button
          size="sm"
          type="submit"
          disabled={isLoading}
          className="h-8 px-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <span>{description}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  );
}
