export type SubjectId =
  | "bengali"
  | "english"
  | "mathematics"
  | "physical_science"
  | "life_science"
  | "history"
  | "geography";

export type NavTab =
  | "dashboard"
  | "quiz"
  | "questions"
  | "tutor"
  | "evaluator"
  | "memory"
  | "syllabus"
  | "formula_book"
  | "settings";

export interface SubjectInfo {
  id: SubjectId;
  nameEn: string;
  nameBn: string;
  iconName: string;
  color: string;
  bgLight: string;
  badgeBg: string;
  totalChapters: number;
  description: string;
}

export type QuestionType = "mcq" | "true_false" | "short_answer";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tip: string;
  difficulty: "easy" | "medium" | "hard";
  subject?: string;
  topic?: string;
}

export interface PracticeSet {
  title: string;
  subject: string;
  topic: string;
  questions: Question[];
}

export interface AnswerEvaluation {
  isCorrect: boolean;
  feedback: string;
  correctAnswer: string;
  revisionTip: string;
}

export interface StudyFact {
  fact: string;
  whyItMatters: string;
  memoryTip: string;
  subject: string;
  topic: string;
}

export interface ImportantQuestionItem {
  id: string;
  marks: number;
  category: string; // 1 Mark VSA, 2 Mark SA, 3 Mark Analytical, 5 Mark Long Answer
  question: string;
  keyPointsToAnswer: string[];
  commonMistake: string;
}

export interface ImportantQuestionsResponse {
  subject: string;
  chapter: string;
  disclaimer: string;
  items: ImportantQuestionItem[];
}

export interface MnemonicItem {
  id: string;
  subject: SubjectId;
  title: string;
  mnemonic: string;
  explanation: string;
  fullFormOrBreakdown: { key: string; value: string }[];
}

export interface SyllabusChapter {
  id: string;
  titleBn: string;
  titleEn: string;
  subtopics: string[];
  marksWeightage?: string;
}

export interface StudentProfile {
  name: string;
  dailyGoal: number; // e.g. 15 questions per day
  streakDays: number;
  lastActiveDate: string;
}
