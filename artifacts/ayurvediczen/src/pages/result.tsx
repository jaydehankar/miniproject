import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import type { DiagnosisResult } from "@workspace/api-client-react";
import { Leaf, Wind, Droplets } from "lucide-react";

export default function Result() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('diagnosisResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      setLocation("/questionnaire");
    }
  }, [setLocation]);

  if (!result) return null;

  const totalPoints = result.vataScore + result.pittaScore + result.kaphaScore;
  const vataPct = (result.vataScore / totalPoints) * 100;
  const pittaPct = (result.pittaScore / totalPoints) * 100;
  const kaphaPct = (result.kaphaScore / totalPoints) * 100;

  const getDoshaIcon = () => {
    switch(result.result) {
      case "Vata": return <Wind className="w-12 h-12 text-blue-500" />;
      case "Pitta": return (
        <div className="w-12 h-12 flex items-center justify-center">
           <div className="w-8 h-8 rounded-full border-4 border-orange-500 flex items-center justify-center">
             <div className="w-3 h-3 bg-orange-500 rounded-full" />
           </div>
        </div>
      );
      case "Kapha": return <Droplets className="w-12 h-12 text-green-500" />;
      default: return <Leaf className="w-12 h-12 text-primary" />;
    }
  };

  const getDoshaColorClass = () => {
    switch(result.result) {
      case "Vata": return "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800";
      case "Pitta": return "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-800";
      case "Kapha": return "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h1 className="text-3xl text-muted-foreground font-medium mb-2">Your Dominant Dosha is</h1>
        <div className={`inline-flex flex-col items-center justify-center p-12 rounded-full border-4 my-8 ${getDoshaColorClass()} w-64 h-64 shadow-xl`}>
          {getDoshaIcon()}
          <span className="text-5xl font-serif mt-4 font-bold tracking-tight">{result.result}</span>
        </div>
      </div>

      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-card-border mb-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif mb-4">Your Constitution Breakdown</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>Vata</span>
                  <span>{Math.round(vataPct)}%</span>
                </div>
                <div className="h-3 w-full bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${vataPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>Pitta</span>
                  <span>{Math.round(pittaPct)}%</span>
                </div>
                <div className="h-3 w-full bg-orange-100 dark:bg-orange-950 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pittaPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>Kapha</span>
                  <span>{Math.round(kaphaPct)}%</span>
                </div>
                <div className="h-3 w-full bg-green-100 dark:bg-green-950 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${kaphaPct}%` }} />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-4">Understanding Your Dosha</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {result.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 mb-12">
        <h2 className="text-2xl font-serif mb-6 text-center">Personalized Recommendations</h2>
        <ul className="space-y-4 max-w-2xl mx-auto">
          {result.recommendations.map((rec, idx) => (
            <li key={idx} className="flex gap-4 bg-background p-4 rounded-xl border border-border shadow-sm">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-medium">
                {idx + 1}
              </span>
              <span className="text-foreground leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => {
            sessionStorage.removeItem('diagnosisResult');
            setLocation("/questionnaire");
          }}
          className="rounded-full px-8 h-12"
        >
          Retake Questionnaire
        </Button>
        <Link href="/dashboard">
          <Button size="lg" className="rounded-full px-8 h-12 shadow-md">
            View My Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
