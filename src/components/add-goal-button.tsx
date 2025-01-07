import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function AddGoalButton() {
  return (
    <Button className="w-full h-16 text-lg" variant="outline">
      <Plus className="mr-2 h-6 w-6" /> Add New Goal
    </Button>
  )
}

