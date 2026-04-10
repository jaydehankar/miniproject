import { useGetResponses, useGetDiagnosisStats } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, Droplets, Leaf } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: stats, isLoading: isStatsLoading } = useGetDiagnosisStats();
  const { data: responses, isLoading: isResponsesLoading } = useGetResponses();

  const renderDoshaBadge = (dosha: string) => {
    switch(dosha) {
      case "Vata": return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-100">Vata</span>;
      case "Pitta": return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium dark:bg-orange-900 dark:text-orange-100">Pitta</span>;
      case "Kapha": return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-100">Kapha</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium dark:bg-gray-800 dark:text-gray-100">{dosha}</span>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-6">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Your journey to wellness, tracked over time.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {isStatsLoading ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
        ) : stats ? (
          <>
            <div className="bg-card rounded-2xl p-6 border border-card-border shadow-sm flex flex-col justify-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Assessments</p>
              <p className="text-4xl font-serif font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Vata Types</p>
              </div>
              <p className="text-4xl font-serif font-bold text-blue-900 dark:text-blue-100">{stats.vataCount}</p>
            </div>
            <div className="bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-900 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                </div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Pitta Types</p>
              </div>
              <p className="text-4xl font-serif font-bold text-orange-900 dark:text-orange-100">{stats.pittaCount}</p>
            </div>
            <div className="bg-green-50/50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-900 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-green-500" />
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Kapha Types</p>
              </div>
              <p className="text-4xl font-serif font-bold text-green-900 dark:text-green-100">{stats.kaphaCount}</p>
            </div>
          </>
        ) : null}
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-6">Past Diagnoses</h2>
        <div className="bg-card rounded-2xl border border-card-border shadow-sm overflow-hidden">
          {isResponsesLoading ? (
            <div className="p-8 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : responses && responses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30">
                    <th className="p-4 font-medium text-muted-foreground">Date</th>
                    <th className="p-4 font-medium text-muted-foreground">Dominant Dosha</th>
                    <th className="p-4 font-medium text-muted-foreground text-center">Vata Score</th>
                    <th className="p-4 font-medium text-muted-foreground text-center">Pitta Score</th>
                    <th className="p-4 font-medium text-muted-foreground text-center">Kapha Score</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response) => (
                    <tr key={response.id} className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="p-4 text-sm font-medium">
                        <Link href={`/response/${response.id}`} className="hover:underline text-primary">
                          {format(new Date(response.createdAt), "MMM d, yyyy")}
                        </Link>
                      </td>
                      <td className="p-4">
                        {renderDoshaBadge(response.result)}
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{response.vataScore}</td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{response.pittaScore}</td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{response.kaphaScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
              <Leaf className="w-12 h-12 opacity-20 mb-4" />
              <p className="text-lg">No assessments taken yet.</p>
              <p className="text-sm mt-1">Take the questionnaire to see your history here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
