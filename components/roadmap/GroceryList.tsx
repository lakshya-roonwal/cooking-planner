import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Tag } from "lucide-react";
import { Roadmap } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface GroceryListProps {
  items: Roadmap["groceryList"];
}

const CATEGORY_COLORS: Record<string, string> = {
  Produce: "bg-green-100 text-green-700",
  "Meat/Protein": "bg-red-100 text-red-700",
  Pantry: "bg-amber-100 text-amber-700",
  Dairy: "bg-blue-100 text-blue-700",
  Other: "bg-gray-100 text-gray-700",
};

export function GroceryList({ items }: GroceryListProps) {
  return (
    <Card className="shadow-lg border-primary/5">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Essential Groceries
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b text-muted-foreground uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-4 text-left">Ingredient</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-right">Est. Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-medium group-hover:text-primary transition-colors">
                    {item.item}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                      CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other
                    )}>
                      <Tag className="h-3 w-3" />
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-muted-foreground">
                    ${item.estimatedCost.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
