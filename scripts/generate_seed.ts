import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

// Create a client with the service role key if possible to bypass RLS, 
// but here we use ANON key. We might need to handle RLS.
// Ideally for seeding we should use SERVICE_ROLE_KEY if we had it, but we only have ANON.
// However, our RLS policy allows INSERT for authenticated users or public?
// We set "Public courses are viewable" but insert might be restricted.
// Let's check schema: "CREATE POLICY "Users can update their own progress" ...
// We didn't enable RLS on courses/steps for INSERT, so default is DENY if RLS is on.
// Wait, I enabled RLS on courses/steps. I need to add a policy to allow insert, or use service role.
// Since I don't have service role key from the user (only anon), I will temporarily disable RLS or add a policy?
// Actually, I can just use the CLI to run SQL to insert? No, that's hard with dynamic content.
// I will ask the user for the SERVICE_ROLE_KEY or ask them to run a SQL to allow anon insert temporarily?
// OR, I can use the `supabase` CLI to run this script if it has access? 
// Actually, the `supabase login` gave me access to `supabase db push`. 
// Maybe I can generate a seed.sql file and push it! That is much safer and bypasses RLS issues.

const DATA_DIR = path.join(process.cwd(), 'data');

function generateSeedSql() {
    let sql = '';

    // 1. Courses
    const coursesDir = path.join(DATA_DIR, 'courses');
    const courseFiles = fs.readdirSync(coursesDir).filter(f => f.endsWith('.json'));

    for (const file of courseFiles) {
        const courseId = file.replace('.json', '');
        const content = fs.readFileSync(path.join(coursesDir, file), 'utf8');
        const course = JSON.parse(content);

        // Escape single quotes
        const escape = (str: string) => str.replace(/'/g, "''");

        const tags = `{${course.tags.map((t: string) => `"${t}"`).join(',')}}`;

        sql += `
INSERT INTO courses (id, title, description, level, tags)
VALUES ('${courseId}', '${escape(course.title)}', '${escape(course.description)}', '${course.level}', '${tags}')
ON CONFLICT (id) DO UPDATE SET 
title = EXCLUDED.title, description = EXCLUDED.description, level = EXCLUDED.level, tags = EXCLUDED.tags;
`;

        // 2. Steps for this course
        // The course.json has a list of step IDs.
        if (course.steps && Array.isArray(course.steps)) {
            course.steps.forEach((stepId: string, index: number) => {
                const stepPath = path.join(DATA_DIR, 'steps', courseId, `${stepId}.md`);
                if (fs.existsSync(stepPath)) {
                    const stepContent = fs.readFileSync(stepPath, 'utf8');
                    const { data, content } = matter(stepContent);

                    const quizJson = JSON.stringify(data.quiz || {}).replace(/'/g, "''");
                    const refsJson = JSON.stringify(data.references || []).replace(/'/g, "''");

                    sql += `
INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('${stepId}', '${courseId}', ${index + 1}, '${escape(data.title)}', '${escape(data.learning_goal || '')}', '${escape(content)}', '${quizJson}', '${refsJson}')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;
`;
                }
            });
        }
    }

    return sql;
}

const sql = generateSeedSql();
fs.writeFileSync('supabase/seed.sql', sql);
console.log('Generated supabase/seed.sql');
