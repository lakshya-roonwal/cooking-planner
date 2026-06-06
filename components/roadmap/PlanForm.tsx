"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";

interface PlanFormProps {
  onSubmit: (data: { prompt: string; schedule: string; budgetLimit: string }) => void;
  isLoading: boolean;
}

export function PlanForm({ onSubmit, isLoading }: PlanFormProps) {
  const [prompt, setPrompt] = useState("");
  const [schedule, setSchedule] = useState("busy");
  const [budgetLimit, setBudgetLimit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ prompt, schedule, budgetLimit });
  };

  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Create Your Plan
        </CardTitle>
        <CardDescription>
          Tell us about your day and what you're craving.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-semibold">
              Culinary Preferences
            </Label>
            <Textarea
              id="prompt"
              placeholder="e.g., High protein vegetarian, 1500 calories, Mediterranean style..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="schedule" className="text-sm font-semibold">
                Time Availability
              </Label>
              <Select value={schedule} onValueChange={setSchedule}>
                <SelectTrigger id="schedule">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="busy">Busy (Under 20m)</SelectItem>
                  <SelectItem value="moderate">Moderate (30-45m)</SelectItem>
                  <SelectItem value="free">Free (Chef Mode)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-semibold">
                Budget Limit ($)
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="Optional"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Crafting your roadmap...
              </>
            ) : (
              "Generate Roadmap"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
