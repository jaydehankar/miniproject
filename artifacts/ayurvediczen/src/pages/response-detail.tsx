import { useParams, Link } from "wouter";
import { useGetResponse } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wind, Droplets, Leaf } from "lucide-react";

export default function ResponseDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);

  const { data: response, isLoading } = useGetResponse(id);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 space-y-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 text-center">
        <h2 className="text-2xl font-serif mb-4">Response not found</h2>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const totalPoints = response.vataScore + response.pittaScore + response.kaphaScore;
  const vataPct = (response.vataScore / totalPoints) * 100 || 0;
  const pittaPct = (response.pittaScore / totalPoints) * 100 || 0;
  const kaphaPct = (response.kaphaScore / totalPoints) * 100 || 0;

  const getDoshaIcon = () => {
    switch(response.result) {
      case "Vata": return <Wind className="w-10 h-10 text-blue-500" />;
      case "Pitta": return (
        <div className="w-10 h-10 flex items-center justify-center">
           <div className="w-6 h-6 rounded-full border-4 border-orange-500 flex items-center justify-center">
             <div className="w-2 h-2 bg-orange-500 rounded-full" />
           </div>
        </div>
      );
      case "Kapha": return <Droplets className="w-10 h-10 text-green-500" />;
      default: return <Leaf className="w-10 h-10 text-primary" />;
    }
  };

  const getDoshaColorClass = () => {
    switch(response.result) {
      case "Vata": return "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800";
      case "Pitta": return "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-800";
      case "Kapha": return "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="bg-card rounded-3xl p-8 shadow-sm border border-card-border mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Assessment Results</h1>
            <p className="text-muted-foreground">Taken on {format(new Date(response.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
          </div>
          <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${getDoshaColorClass()}`}>
            {getDoshaIcon()}
            <div>
              <p className="text-sm font-medium opacity-80">Dominant Dosha</p>
              <p className="text-2xl font-serif font-bold">{response.result}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-serif mb-4">Constitution Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Vata</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Air & Space</p>
                </div>
                <span className="text-2xl font-serif text-blue-900 dark:text-blue-100">{response.vataScore}</span>
              </div>
              <div className="h-2 w-full bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${vataPct}%` }} />
              </div>
            </div>

            <div className="bg-orange-50/50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-medium text-orange-900 dark:text-orange-100">Pitta</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Fire & Water</p>
                </div>
                <span className="text-2xl font-serif text-orange-900 dark:text-orange-100">{response.pittaScore}</span>
              </div>
              <div className="h-2 w-full bg-orange-200 dark:bg-orange-900 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pittaPct}%` }} />
              </div>
            </div>

            <div className="bg-green-50/50 dark:bg-green-950/20 p-6 rounded-2xl border border-green-100 dark:border-green-900">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-medium text-green-900 dark:text-green-100">Kapha</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Earth & Water</p>
                </div>
                <span className="text-2xl font-serif text-green-900 dark:text-green-100">{response.kaphaScore}</span>
              </div>
              <div className="h-2 w-full bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${kaphaPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
