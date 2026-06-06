import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Coffee, Sun, Moon } from "lucide-react";
import { Roadmap } from "@/lib/schema";

interface MealCardProps {
  type: "breakfast" | "lunch" | "dinner";
  data: Roadmap["meals"]["breakfast"]; // All meals have the same structure
}

export function MealCard({ type, data }: MealCardProps) {
  const icons = {
    breakfast: <Coffee className="h-5 w-5" />,
    lunch: <Sun className="h-5 w-5" />,
    dinner: <Moon className="h-5 w-5" />,
  };

  const colors = {
    breakfast: "bg-orange-50 text-orange-700 border-orange-100",
    lunch: "bg-blue-50 text-blue-700 border-blue-100",
    dinner: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
      <div className={`px-4 py-3 flex justify-between items-center ${colors[type]}`}>
        <div className="flex items-center gap-2">
          {icons[type]}
          <span className="text-xs font-black uppercase tracking-widest">
            {type}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Clock className="h-3.5 w-3.5" />
          {data.prepTimeMins} min
        </div>
      </div>
      <CardHeader className="p-5">
        <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-6">
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Instructions</h4>
          <ul className="space-y-3">
            {data.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/5 text-primary text-[10px] font-bold border border-primary/10">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
