export type StudentClass = "class_6" | "class_10";

export type SubjectId =
  | "bengali"
  | "english"
  | "mathematics"
  | "physical_science"
  | "life_science"
  | "history"
  | "geography"
  | "bengali_6"
  | "english_6"
  | "mathematics_6"
  | "science_6"
  | "history_6"
  | "geography_6"
  | string;

export type NavTab =
  | "dashboard"
  | "question_papers"
  | "important_questions"
  | "quiz"
  | "questions"
  | "tutor"
  | "evaluator"
  | "memory"
  | "syllabus"
  | "formula_book"
  | "history"
  | "notes"
  | "bookmarks"
  | "settings"
  | "admin_panel";

export type ExamType =
  | "board_final"
  | "test_exam"
  | "model_paper"
  | "mock_test"
  | "suggestion"
  | "chapter_wise"
  | "summative_1"
  | "summative_2"
  | "summative_3"
  | "half_yearly"
  | "annual";

export type VerificationStatus =
  | "verified_board"
  | "verified_school"
  | "model_paper"
  | "expert_suggestion";

export interface QuestionPaperItem {
  id: string;
  classId: StudentClass;
  subjectId: string;
  subjectNameBn: string;
  year: number;
  examType: ExamType;
  examTypeNameBn: string;
  title: string;
  description: string;
  pdfUrl?: string;
  fileSize: string;
  source: string;
  verificationStatus: VerificationStatus;
  isAvailable: boolean;
  totalMarks: number;
  durationMinutes: number;
  uploadedAt: string;
  isPublished?: boolean;
  sections?: {
    name: string;
    instructions?: string;
    marks: number;
    questions: {
      num: string;
      text: string;
      marks: number;
      options?: string[];
      answerOrHint?: string;
    }[];
  }[];
}

export interface ImportantQuestionRecord {
  id: string;
  classId: StudentClass;
  subjectId: string;
  subjectNameBn: string;
  chapter: string;
  category:
    | "very_important"
    | "important"
    | "frequently_practised"
    | "previous_year"
    | "exam_prep"
    | "chapter_wise";
  categoryNameBn: string;
  marks: number;
  questionType: "mcq" | "saq" | "analytical" | "descriptive";
  question: string;
  solution: string;
  difficulty: "easy" | "medium" | "hard";
  year?: number;
  source?: string;
}

export interface SubjectInfo {
  id: SubjectId;
  classId?: StudentClass;
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
  targetYear?: number;
  avatarEmoji?: string;
}

export interface HistoryItem {
  id: string;
  type: "quiz_attempt" | "tutor_query" | "evaluator_check" | "chapter_read" | "note_created";
  title: string;
  subject: SubjectId;
  subjectNameBn: string;
  timestamp: string; // ISO string
  score?: { correct: number; total: number };
  details?: string;
  tags?: string[];
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  subject: SubjectId;
  chapter?: string;
  updatedAt: string;
  tags?: string[];
}

export interface BookmarkItem {
  id: string;
  type: "question" | "formula" | "fact" | "note";
  title: string;
  content: string;
  subject: SubjectId;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "reminder" | "quiz" | "achievement" | "info";
  linkTab?: NavTab;
}

export interface UserAuthProfile {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  isGuest: boolean;
  avatarEmoji: string;
  targetYear: number;
  classGrade: string;
}

export interface NotificationPreferences {
  dailyReminder: boolean;
  quizAlerts: boolean;
  examCountdown: boolean;
  soundEffects: boolean;
  streakProtection: boolean;
}
