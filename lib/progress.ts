"use client";

import { UserProgress } from "./types";

const STORAGE_KEY_PREFIX = "ai_study_progress_";

export function getProgress(courseId: string): UserProgress | null {
    if (typeof window === "undefined") return null;
    const key = `${STORAGE_KEY_PREFIX}${courseId}`;
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
        return JSON.parse(data) as UserProgress;
    } catch {
        return null;
    }
}

export function saveProgress(progress: UserProgress) {
    if (typeof window === "undefined") return;
    const key = `${STORAGE_KEY_PREFIX}${progress.course_id}`;
    localStorage.setItem(key, JSON.stringify(progress));
}

export function initializeProgress(courseId: string): UserProgress {
    const existing = getProgress(courseId);
    if (existing) return existing;

    const newProgress: UserProgress = {
        user_id: "guest",
        course_id: courseId,
        current_step_order: 1,
        completed_steps: [],
        status: "not_started",
        last_accessed_at: new Date().toISOString(),
    };
    saveProgress(newProgress);
    return newProgress;
}

export function markStepAsCompleted(courseId: string, stepId: string, nextStepOrder: number) {
    const progress = getProgress(courseId) || initializeProgress(courseId);

    if (!progress.completed_steps.includes(stepId)) {
        progress.completed_steps.push(stepId);
    }

    if (progress.current_step_order < nextStepOrder) {
        progress.current_step_order = nextStepOrder;
    }

    progress.status = "in_progress";
    progress.last_accessed_at = new Date().toISOString();
    // Simple logic: if completed steps count is enough? We don't know total steps here easily.
    // We'll handle 'completed' status elsewhere or pass total steps.

    saveProgress(progress);
    return progress;
}
