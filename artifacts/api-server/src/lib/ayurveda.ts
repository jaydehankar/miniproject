export type DoshaType = "Vata" | "Pitta" | "Kapha";

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

const ANSWER_SCORES: Record<string, DoshaScores> = {
  a: { vata: 2, pitta: 0, kapha: 0 },
  b: { vata: 0, pitta: 2, kapha: 0 },
  c: { vata: 0, pitta: 0, kapha: 2 },
};

export function calculateScores(answers: Record<string, string>): DoshaScores {
  const totals: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
  for (const answer of Object.values(answers)) {
    const score = ANSWER_SCORES[answer.toLowerCase()];
    if (score) {
      totals.vata += score.vata;
      totals.pitta += score.pitta;
      totals.kapha += score.kapha;
    }
  }
  return totals;
}

export function getDominantDosha(scores: DoshaScores): DoshaType {
  if (scores.vata >= scores.pitta && scores.vata >= scores.kapha) return "Vata";
  if (scores.pitta >= scores.vata && scores.pitta >= scores.kapha) return "Pitta";
  return "Kapha";
}

const DOSHA_DESCRIPTIONS: Record<DoshaType, string> = {
  Vata:
    "Your dominant dosha is Vata, governed by the elements of Air and Space. A Vata imbalance often manifests as anxiety, dryness, irregular digestion, poor sleep, and variable energy. You tend to be creative and enthusiastic but may feel scattered or overwhelmed under stress.",
  Pitta:
    "Your dominant dosha is Pitta, governed by the elements of Fire and Water. A Pitta imbalance often manifests as irritability, inflammation, acid reflux, skin sensitivities, and excessive heat. You tend to be focused and driven but may become controlling or overly critical.",
  Kapha:
    "Your dominant dosha is Kapha, governed by the elements of Earth and Water. A Kapha imbalance often manifests as lethargy, weight gain, congestion, slow digestion, and emotional heaviness. You tend to be calm and nurturing but may become resistant to change.",
};

const DOSHA_RECOMMENDATIONS: Record<DoshaType, string[]> = {
  Vata: [
    "Establish a consistent daily routine for meals, sleep, and activities",
    "Favor warm, cooked, oily, and nourishing foods",
    "Practice calming yoga, gentle stretching, and meditation",
    "Stay warm and avoid excessive cold, dry, or windy environments",
    "Use sesame or almond oil for self-massage (Abhyanga)",
    "Reduce stimulants like caffeine and favor herbal teas",
    "Prioritize rest and avoid overcommitting your schedule",
  ],
  Pitta: [
    "Favor cool, refreshing, and mildly spiced foods",
    "Avoid excessive heat, spicy foods, alcohol, and direct sun exposure",
    "Practice cooling yoga, moon salutations, and calming breathwork",
    "Engage in creative outlets and activities that channel your passion",
    "Use coconut or sunflower oil for self-massage",
    "Surround yourself with calming colors, nature, and water",
    "Practice compassion and let go of perfectionism",
  ],
  Kapha: [
    "Engage in stimulating, vigorous exercise to energize the body",
    "Favor light, warm, and well-spiced foods; avoid heavy or oily meals",
    "Wake up early (before 6am) to counter Kapha's heavy morning energy",
    "Seek new experiences and social engagement to avoid stagnation",
    "Use stimulating dry brushing or light massages with mustard oil",
    "Reduce dairy, cold foods, and excessive sleep",
    "Challenge yourself with new goals and embrace change willingly",
  ],
};

export interface DiagnosisOutput {
  dosha: DoshaType;
  description: string;
  recommendations: string[];
}

export function getDiagnosis(answers: Record<string, string>): {
  scores: DoshaScores;
  output: DiagnosisOutput;
} {
  const scores = calculateScores(answers);
  const dosha = getDominantDosha(scores);
  return {
    scores,
    output: {
      dosha,
      description: DOSHA_DESCRIPTIONS[dosha],
      recommendations: DOSHA_RECOMMENDATIONS[dosha],
    },
  };
}
