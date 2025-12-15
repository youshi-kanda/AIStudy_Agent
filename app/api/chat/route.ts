import { createClient } from "@supabase/supabase-js";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;
export const runtime = 'edge'; // Required for Cloudflare Pages

export async function POST(req: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    // 1. Generate embedding for the user's query
    // We use the same model as we did for indexing
    // Note: Vercel AI SDK 'embed' function can be used or direct API call if needed
    // Here we use the streamText tool feature to do RAG naturally or we can pre-fetch.
    // For simplicity and speed in this demo, let's pre-fetch context.

    // However, @ai-sdk/google might not expose 'embed' directly in the same way as openai one effortlessly inside this flow?
    // Actually the 'ai' package has 'embed'.

    // Let's rely on the model's knowledge mostly, but inject context if we find it.

    // For Vercel AI SDK Standard RAG:
    const { embed } = await import("ai");

    const { embedding } = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: query,
    });

    // 2. Search Supabase for relevant documents
    const { data: documents, error } = await supabase.rpc("match_documents", {
        query_embedding: embedding,
        match_threshold: 0.5, // Similarity threshold
        match_count: 5,       // Top K
    });

    if (error) {
        console.error("Vector search error:", error);
    }

    const context = documents
        ?.map((doc: any) => `[Source: ${doc.metadata.title}]\n${doc.content}`)
        .join("\n\n") || "";

    const systemPrompt = `You are an AI learning assistant for the "AI Study Agent" platform.
    You help users learn about AI, APIs, and Python.
    
    Use the following CONTEXT from the course materials to answer the user's question.
    If the answer is found in the context, cite the source title.
    If the answer is NOT in the context, use your general knowledge but mention that it's outside the current course material.
    
    CONTEXT:
    ${context}
    `;

    // 3. Generate response with Gemini
    const result = streamText({
        model: google("gemini-1.5-flash"), // Use Flash for speed
        system: systemPrompt,
        messages,
    });

    return result.toTextStreamResponse();
}
