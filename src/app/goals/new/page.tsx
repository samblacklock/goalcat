import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createGoal } from "@/app/actions/goals";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PASTEL_COLORS = [
  "#FF8B8B", // Coral
  "#FFB86B", // Soft orange
  "#FFF599", // Butter yellow
  "#95FF9E", // Fresh mint
  "#87FFCD", // Aquamarine
  "#9FFFEF", // Turquoise
  "#94DAFF", // Sky blue
  "#A7C7FF", // Cornflower
  "#C4B3FF", // Periwinkle
  "#E5B3FF", // Light purple
  "#FFA3CF", // Bubblegum
  "#FFB397", // Peach
] as const;

export default function NewGoalPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGoal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input type="number" id="target" name="target" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <RadioGroup
                name="color"
                className="grid grid-cols-4 gap-2"
                defaultValue={PASTEL_COLORS[0]}
              >
                {PASTEL_COLORS.map((color) => (
                  <div key={color} className="relative">
                    <RadioGroupItem
                      value={color}
                      id={color}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={color}
                      className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Create Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
