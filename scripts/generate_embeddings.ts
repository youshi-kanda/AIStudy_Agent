import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Use service role if available for RLS bypass, but anon might work if policies allow
// Ideally use SERVICE_ROLE_KEY for admin tasks
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateEmbeddings() {
    console.log("Fetching steps from Supabase...");
    const { data: steps, error } = await supabase
        .from("steps")
        .select("id, course_id, content_md, title");

    if (error) {
        console.error("Error fetching steps:", error);
        return;
    }

    console.log(`Found ${steps.length} steps. Generating embeddings...`);

    for (const step of steps) {
        const content = `Title: ${step.title}\n\n${step.content_md}`;

        try {
            const { embedding } = await embed({
                model: google.textEmbeddingModel("text-embedding-004"),
                value: content,
            });

            // Delete existing embedding for this step to avoid duplicates
            await supabase
                .from("course_embeddings")
                .delete()
                .eq("step_id", step.id);

            // Insert new embedding
            const { error: insertError } = await supabase
                .from("course_embeddings")
                .insert({
                    course_id: step.course_id,
                    step_id: step.id,
                    content: content,
                    embedding: embedding,
                    metadata: { title: step.title }
                });

            if (insertError) {
                console.error(`Error saving embedding for ${step.title}:`, insertError);
            } else {
                console.log(`Generated and saved embedding for: ${step.title}`);
            }

        } catch (err) {
            console.error(`Error generating embedding for ${step.title}:`, err);
        }
    }
    console.log("Embedding generation complete!");
}

generateEmbeddings();
