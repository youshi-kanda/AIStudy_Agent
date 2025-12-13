import { getAllCourses } from "@/lib/data";
export const runtime = 'edge';
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "AI Study Agent",
  description: "Learn AI Engineering Step by Step",
};

export default async function Home() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
            AI Study Agent
          </h1>
          <p className="text-slate-400 text-lg">
            AIエージェント開発の「地図」を手に入れよう。
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Available Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="block group"
              >
                <article className="h-full bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-500/20">
                      {course.level}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {course.total_steps} Steps
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map(tag => (
                      <span key={tag} className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
