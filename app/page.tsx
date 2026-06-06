"use client";

import { useState } from "react";
import { Roadmap } from "@/lib/schema";
import { PlanForm } from "@/components/roadmap/PlanForm";
import { MealCard } from "@/components/roadmap/MealCard";
import { GroceryList } from "@/components/roadmap/GroceryList";
import { BudgetAnalysis } from "@/components/roadmap/BudgetAnalysis";
import { Substitutions } from "@/components/roadmap/Substitutions";
import { RoadmapSkeleton } from "@/components/roadmap/RoadmapSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, AlertCircle, ChefHat, Info } from "lucide-react";

export default function CulinaryDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const handleGenerate = async (formData: { prompt: string; schedule: string; budgetLimit: string }) => {
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate roadmap");
      }

      setRoadmap(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-background to-background">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
            <ChefHat className="h-3.5 w-3.5" />
            Smart Culinary Engine
          </div>
          <h1 className="text-5xl font-black tracking-tighter lg:text-7xl bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            Culinary Roadmap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Your personalized, AI-driven culinary assistant. Plan your meals, manage your budget, and shop smarter.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[380px_1fr] items-start">
          <aside className="lg:sticky lg:top-8">
            <Card className="border-muted-foreground/10 shadow-xl shadow-primary/5 bg-white/50 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold tracking-tight">Generate Plan</CardTitle>
                <CardDescription>Tailor your roadmap to your life.</CardDescription>
              </CardHeader>
              <CardContent>
                <PlanForm onSubmit={handleGenerate} isLoading={loading} />
              </CardContent>
              <div className="px-6 pb-6 pt-2">
                <div className="p-3 rounded-xl bg-muted/30 border border-muted-foreground/5 flex gap-3">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Our AI considers your schedule and budget to create a realistic roadmap. All instructions are cross-referenced with your grocery list.
                  </p>
                </div>
              </div>
            </Card>
          </aside>

          <main className="min-h-[600px]">
            {error && (
              <Alert variant="destructive" className="mb-8 animate-in slide-in-from-top-4 duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">Generation Failed</AlertTitle>
                <AlertDescription className="text-sm opacity-90">{error}</AlertDescription>
              </Alert>
            )}

            {!roadmap && !loading && !error && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/10 rounded-3xl bg-muted/[0.02] p-12 text-center transition-all">
                <div className="bg-primary/5 p-6 rounded-full mb-6">
                  <Utensils className="h-16 w-16 text-primary/20" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3">Ready to Cook?</h3>
                <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Enter your cravings and schedule on the left to generate your custom culinary roadmap.
                </p>
              </div>
            )}

            {loading && <RoadmapSkeleton />}

            {roadmap && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* Meals Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-lg">
                      <Utensils className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Today's Gastronomy</h2>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <MealCard type="breakfast" data={roadmap.meals.breakfast} />
                    <MealCard type="lunch" data={roadmap.meals.lunch} />
                    <MealCard type="dinner" data={roadmap.meals.dinner} />
                  </div>
                </section>

                <div className="grid gap-12 md:grid-cols-2">
                  <GroceryList items={roadmap.groceryList} />
                  <div className="space-y-12">
                    <BudgetAnalysis analysis={roadmap.budgetAnalysis} />
                    <Substitutions subs={roadmap.substitutions} />
                  </div>
                </div>
                
                <footer className="pt-8 text-center border-t border-muted/50">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/30">
                    Generated by Culinary Engine v1.0 • Gemini 1.5 Flash
                  </p>
                </footer>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
