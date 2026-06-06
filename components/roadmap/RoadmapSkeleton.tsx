import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function RoadmapSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Meals Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-muted-foreground/10">
              <Skeleton className="h-10 w-full" />
              <CardHeader className="p-5">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="px-5 pb-6 space-y-3">
                <Skeleton className="h-3 w-1/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Grocery Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Card className="border-muted-foreground/10 overflow-hidden">
            <div className="p-0">
              <Skeleton className="h-12 w-full" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 border-b border-muted/50">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Budget Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Card className="h-[200px] border-muted-foreground/10 flex flex-col p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
