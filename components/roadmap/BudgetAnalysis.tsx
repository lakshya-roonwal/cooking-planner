import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

interface BudgetAnalysisProps {
  analysis: {
    totalCost: number;
    isUnderBudget: boolean;
    explanation: string;
  };
}

export function BudgetAnalysis({ analysis }: BudgetAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card className={`border-2 transition-all ${
        analysis.isUnderBudget 
          ? "border-green-500/20 bg-green-50/20 dark:bg-green-500/5" 
          : "border-amber-500/20 bg-amber-50/20 dark:bg-amber-500/5"
      }`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                {analysis.isUnderBudget ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                Budget Analysis
              </CardTitle>
              <CardDescription className="font-medium uppercase tracking-wider text-xs">
                Status: {analysis.isUnderBudget ? "Under Budget" : "Action Recommended"}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black tracking-tighter text-primary">
                ${analysis.totalCost.toFixed(2)}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Est. Cost</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />
            <p className="text-sm leading-relaxed text-muted-foreground italic pl-3">
              "{analysis.explanation}"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
