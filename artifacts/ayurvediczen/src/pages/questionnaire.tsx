import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSubmitAnswers } from "@workspace/api-client-react";
import { Loader2 } from "lucide-react";

const questions = [
  {
    id: "q1",
    text: "How is your body frame?",
    options: [
      { value: "a", label: "Thin, light (Vata)" },
      { value: "b", label: "Medium, muscular (Pitta)" },
      { value: "c", label: "Heavy, large (Kapha)" },
    ],
  },
  {
    id: "q2",
    text: "How is your skin?",
    options: [
      { value: "a", label: "Dry, rough, or flaky (Vata)" },
      { value: "b", label: "Oily, sensitive, or prone to rashes (Pitta)" },
      { value: "c", label: "Smooth, thick, or moist (Kapha)" },
    ],
  },
  {
    id: "q3",
    text: "How is your digestion?",
    options: [
      { value: "a", label: "Irregular, prone to gas (Vata)" },
      { value: "b", label: "Strong, sharp, gets hungry often (Pitta)" },
      { value: "c", label: "Slow, steady, rarely hungry (Kapha)" },
    ],
  },
  {
    id: "q4",
    text: "How is your sleep?",
    options: [
      { value: "a", label: "Light, interrupted, or irregular (Vata)" },
      { value: "b", label: "Moderate, may wake up hot (Pitta)" },
      { value: "c", label: "Deep, long, hard to wake (Kapha)" },
    ],
  },
  {
    id: "q5",
    text: "How is your energy level?",
    options: [
      { value: "a", label: "Variable, gets tired easily (Vata)" },
      { value: "b", label: "Moderate, intense energy (Pitta)" },
      { value: "c", label: "Sustained, slow-starting (Kapha)" },
    ],
  },
  {
    id: "q6",
    text: "How is your hair?",
    options: [
      { value: "a", label: "Dry, brittle, or frizzy (Vata)" },
      { value: "b", label: "Fine, oily, or early graying (Pitta)" },
      { value: "c", label: "Thick, lush, or oily (Kapha)" },
    ],
  },
  {
    id: "q7",
    text: "How do you handle stress?",
    options: [
      { value: "a", label: "Anxious, worried (Vata)" },
      { value: "b", label: "Irritable, angry (Pitta)" },
      { value: "c", label: "Withdrawn, avoidant (Kapha)" },
    ],
  },
  {
    id: "q8",
    text: "How is your memory?",
    options: [
      { value: "a", label: "Quick to learn, quick to forget (Vata)" },
      { value: "b", label: "Sharp, precise (Pitta)" },
      { value: "c", label: "Slow to learn, never forgets (Kapha)" },
    ],
  },
  {
    id: "q9",
    text: "How is your appetite?",
    options: [
      { value: "a", label: "Variable, erratic (Vata)" },
      { value: "b", label: "Strong, irritable if skipped (Pitta)" },
      { value: "c", label: "Consistent, can skip meals (Kapha)" },
    ],
  },
  {
    id: "q10",
    text: "What is your natural body temperature?",
    options: [
      { value: "a", label: "Cold hands and feet (Vata)" },
      { value: "b", label: "Warm, hot-natured (Pitta)" },
      { value: "c", label: "Cool, comfortable in warmth (Kapha)" },
    ],
  },
  {
    id: "q11",
    text: "How do you speak?",
    options: [
      { value: "a", label: "Fast, lots of ideas (Vata)" },
      { value: "b", label: "Precise, argumentative (Pitta)" },
      { value: "c", label: "Slow, deliberate, calm (Kapha)" },
    ],
  },
  {
    id: "q12",
    text: "How is your weight?",
    options: [
      { value: "a", label: "Hard to gain weight (Vata)" },
      { value: "b", label: "Moderate, gains/loses easily (Pitta)" },
      { value: "c", label: "Easy to gain, hard to lose (Kapha)" },
    ],
  },
];

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [, setLocation] = useLocation();
  const submitAnswers = useSubmitAnswers();

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  const isComplete = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (!isComplete) return;

    submitAnswers.mutate(
      { data: { answers } },
      {
        onSuccess: (data) => {
          // Store in session storage to pass to result page without URL params
          sessionStorage.setItem('diagnosisResult', JSON.stringify(data));
          setLocation("/result");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Discover Your Constitution</h1>
        <p className="text-muted-foreground text-lg">Answer these 12 questions thoughtfully, reflecting on your lifelong tendencies rather than temporary states.</p>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur py-4 mb-8 border-b border-border/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="space-y-12 pb-24">
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-card-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium mb-6 flex gap-3">
                <span className="text-primary/60 font-serif">{index + 1}.</span> 
                {q.text}
              </h3>
              <RadioGroup 
                value={answers[q.id]} 
                onValueChange={(val) => handleOptionChange(q.id, val)}
                className="space-y-3"
              >
                {q.options.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-3 bg-background border border-border/60 p-4 rounded-xl cursor-pointer hover:border-primary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                    <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                    <Label htmlFor={`${q.id}-${opt.value}`} className="flex-1 cursor-pointer text-base leading-relaxed font-normal">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/40 flex justify-center z-50">
        <div className="max-w-3xl w-full flex justify-end">
          <Button 
            size="lg" 
            onClick={handleSubmit} 
            disabled={!isComplete || submitAnswers.isPending}
            className="w-full md:w-auto h-14 px-10 text-lg rounded-full shadow-lg"
          >
            {submitAnswers.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing your answers...
              </>
            ) : (
              "Reveal My Dosha"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
