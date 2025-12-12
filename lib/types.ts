export interface Course {
    id: string;
    title: string;
    description: string;
    total_steps: number;
    level: "beginner" | "intermediate" | "advanced";
    tags: string[];
    steps: string[]; // List of step IDs
}

export interface Quiz {
    question: string;
    type: "choice" | "text" | "order";
    options?: string[];
    correct_answer: string | string[];
    explanation: string;
}

export interface Reference {
    title: string;
    url: string;
    note?: string;
}

export interface Step {
    id: string;
    course_id: string;
    order: number;
    title: string;
    learning_goal: string;
    content_md: string; // The markdown body
    quiz: Quiz;
    references?: Reference[];
}

export interface UserProgress {
    user_id: string; // Typically 'guest' for MVP
    course_id: string;
    current_step_order: number;
    completed_steps: string[];
    status: "not_started" | "in_progress" | "completed";
    last_accessed_at: string;
}
