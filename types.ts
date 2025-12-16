export enum ViewState {
    HOME = 'HOME',
    CONCEPTS = 'CONCEPTS',
    LAB = 'LAB',
    ACTIVITY = 'ACTIVITY',
    STORY = 'STORY',
    QUIZ = 'QUIZ',
    TEACHER = 'TEACHER',
    AI_EDITOR = 'AI_EDITOR'
}

export interface QuizResult {
    id: string;
    studentName: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timestamp: string;
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export enum SolutionType {
    STRONG_ACID = 'Asam Kuat',
    WEAK_ACID = 'Asam Lemah',
    STRONG_BASE = 'Basa Kuat',
    WEAK_BASE = 'Basa Lemah',
    NEUTRAL = 'Netral' // Helper
}
