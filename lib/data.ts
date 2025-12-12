import { supabase } from './supabase/client';
import { Course, Step } from './types';

// Fetch a single course and its step IDs
export async function getCourse(courseId: string): Promise<Course | null> {
    try {
        // 1. Fetch Course Details
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (courseError || !course) {
            console.error(`Error loading course ${courseId}:`, courseError);
            return null;
        }

        // 2. Fetch Step IDs for this course (ordered)
        const { data: steps, error: stepsError } = await supabase
            .from('steps')
            .select('id')
            .eq('course_id', courseId)
            .order('order', { ascending: true });

        if (stepsError) {
            console.error(`Error loading steps for course ${courseId}:`, stepsError);
            return null;
        }

        return {
            ...course,
            steps: steps.map(s => s.id),
            total_steps: steps.length
        } as Course;

    } catch (error) {
        console.error(`Unexpected error loading course ${courseId}:`, error);
        return null;
    }
}

// Fetch all courses
export async function getAllCourses(): Promise<Course[]> {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*');

        if (error) {
            console.error('Error loading courses:', error);
            return [];
        }

        // Fetch steps for all courses to populate the steps array
        // We can do this by fetching all steps and grouping, or N+1 queries.
        // For SSG time, performance isn't critical. Let's do a simple loop for now or a join.
        // Actually, let's just fetch all steps and map them.
        const { data: allSteps } = await supabase.from('steps').select('id, course_id').order('order');

        return courses.map(c => {
            // Filter steps for this course
            const courseSteps = allSteps?.filter(s => s.course_id === c.id).map(s => s.id) || [];
            return {
                ...c,
                steps: courseSteps,
                total_steps: courseSteps.length
            };
        }) as unknown as Course[];

    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

// Fetch a specific step
export async function getStep(courseId: string, stepId: string): Promise<Step | null> {
    try {
        const { data: step, error } = await supabase
            .from('steps')
            .select('*')
            .eq('course_id', courseId)
            .eq('id', stepId)
            .single();

        if (error || !step) {
            console.error(`Error loading step ${stepId} for course ${courseId}:`, error);
            return null;
        }

        return step as Step;
    } catch (error) {
        console.error(`Error loading step ${stepId}:`, error);
        return null;
    }
}
