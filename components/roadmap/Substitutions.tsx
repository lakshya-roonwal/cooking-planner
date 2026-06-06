import { RefreshCw, ArrowRightLeft } from "lucide-react";

interface Substitution {
  original: string;
  replacement: string;
  reason: string;
}

interface SubstitutionsProps {
  subs: Substitution[];
}

export function Substitutions({ subs }: SubstitutionsProps) {
  if (subs.length === 0) return null;

  return (
    <div className="mt-8 pt-8 border-t border-dashed border-muted-foreground/20">
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-primary/10 p-1.5 rounded-lg">
          <ArrowRightLeft className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold tracking-tight">Smart Substitutions</h3>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {subs.map((sub, idx) => (
          <div key={idx} className="group p-4 border rounded-xl bg-muted/20 hover:bg-white hover:shadow-md transition-all duration-300 border-muted-foreground/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-tighter text-muted-foreground line-through decoration-destructive/30">
                {sub.original}
              </span>
              <RefreshCw className="h-3 w-3 text-primary animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-bold text-primary">
                {sub.replacement}
              </span>
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed italic">
              {sub.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
