-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create a table to store your documents
create table if not exists course_embeddings (
  id bigserial primary key,
  course_id text references courses(id) on delete cascade,
  step_id text references steps(id) on delete cascade,
  content text, -- The text content chunk
  embedding vector(768), -- Gemini embeddings are 768 dimensions
  metadata jsonb, -- Extra metadata like title, url
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table course_embeddings enable row level security;

-- Create a function to search for documents
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float,
  step_id text,
  metadata jsonb
)
language plpgsql
as $$
begin
  return query
  select
    course_embeddings.id,
    course_embeddings.content,
    1 - (course_embeddings.embedding <=> query_embedding) as similarity,
    course_embeddings.step_id,
    course_embeddings.metadata
  from course_embeddings
  where 1 - (course_embeddings.embedding <=> query_embedding) > match_threshold
  order by course_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Allow read access to everyone (public knowledge base)
create policy "Allow public read access"
  on course_embeddings
  for select
  to anon
  using (true);

-- Allow write access only to service role (admin/seed script)
create policy "Allow input by service role"
  on course_embeddings
  for insert
  to service_role
  with check (true);
