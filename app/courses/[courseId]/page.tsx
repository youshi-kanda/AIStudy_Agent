export const runtime = 'edge';
import { getCourse, getStep, getAllCourses } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Circle, PlayCircle } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const courses = await getAllCourses();
    return courses.map((course) => ({
        courseId: course.id,
    }));
}

// Since we are using static generation for known paths if needed, or dynamic decoding
// For now, simple server component.

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const course = await getCourse(courseId);

    if (!course) {
        notFound();
    }

    // We need to fetch basic info for each step to show the title.
    // In a real app, 'getCourse' might already include step summaries.
    // Here we load them one by one or trust the ID implies order.
    // Let's modify getCourse or just iterate efficiently.
    // For MVP, we'll map ids.

    const steps = await Promise.all(
        course.steps.map(async (stepId) => {
            const step = await getStep(course.id, stepId);
            return step ? step : null;
        })
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <header className="mb-12">
                    <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2 block">Course</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                    <p className="text-slate-400">{course.description}</p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold mb-6">Curriculum</h2>

                    {steps.map((step, index) => {
                        if (!step) return null;
                        return (
                            <Link
                                key={step.id}
                                href={`/courses/${course.id}/steps/${step.id}`}
                                className="block group"
                            >
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-blue-500/30 transition-all">
                                    <div className="flex-shrink-0 text-slate-600 group-hover:text-blue-400">
                                        <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-200 group-hover:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {step.learning_goal}
                                        </p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-5 h-5 text-blue-500" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </section>
            </div>
        </div>
    );
}
