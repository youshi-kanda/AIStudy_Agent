import fs from 'fs';
import path from 'path';
import { Course, Step } from './types';
import matter from 'gray-matter';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function getCourse(courseId: string): Promise<Course | null> {
    try {
        const filePath = path.join(DATA_DIR, 'courses', `${courseId}.json`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const course = JSON.parse(fileContent) as Course;
        // Ensure id matches filename just in case
        return { ...course, id: courseId };
    } catch (error) {
        console.error(`Error loading course ${courseId}:`, error);
        return null;
    }
}

export async function getAllCourses(): Promise<Course[]> {
    try {
        const coursesDir = path.join(DATA_DIR, 'courses');
        const files = fs.readdirSync(coursesDir);
        const courses = files
            .filter((file) => file.endsWith('.json'))
            .map((file) => {
                const id = file.replace('.json', '');
                const content = fs.readFileSync(path.join(coursesDir, file), 'utf8');
                return { ...JSON.parse(content), id } as Course;
            });
        return courses;
    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

export async function getStep(courseId: string, stepId: string): Promise<Step | null> {
    try {
        // Note: The stepId in the URL might differ from the filename if we aren't careful.
        // However, our course.json lists step IDs which correspond to filenames without extension?
        // In course.json we have "01_what_is_api".
        // Let's assume the argument passed IS the filename base.

        const filePath = path.join(DATA_DIR, 'steps', courseId, `${stepId}.md`);
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            ...data,
            id: stepId, // Ensure ID matches the filename/path, ignoring frontmatter mismatch
            content_md: content,
        } as Step;
    } catch (error) {
        console.error(`Error loading step ${stepId} for course ${courseId}:`, error);
        return null;
    }
}
