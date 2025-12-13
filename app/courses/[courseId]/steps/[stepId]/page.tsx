export const runtime = 'edge';
import { getCourse, getStep, getAllCourses } from "@/lib/data";
import { notFound } from "next/navigation";
import { StepContent } from "@/components/step/StepContent";
import Link from "next/link";
import { X } from "lucide-react";

// Removed generateStaticParams to avoid conflict with Edge Runtime
// Now using SSR for this route


export default async function StepPage({ params }: { params: Promise<{ courseId: string; stepId: string }> }) {
    const { courseId, stepId } = await params;
    const step = await getStep(courseId, stepId);
    const course = await getCourse(courseId);

    if (!step || !course) {
        notFound();
    }

    // Calculate next/prev step logic here or in client.
    const currentIndex = course.steps.indexOf(step.id);
    const totalSteps = course.total_steps;
    const nextStepId = currentIndex < totalSteps - 1 ? course.steps[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
            {/* Sidebar / Header would go here in full layout, simplified for now */}

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Navigation Header */}
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur shrink-0">
                    <div className="flex items-center gap-4">
                        <Link href={`/courses/${course.id}`} className="text-slate-400 hover:text-white p-2 hover:bg-slate-900 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500">Step {step.order} of {totalSteps}</span>
                            <h1 className="text-sm font-bold text-slate-200">{step.title}</h1>
                        </div>
                    </div>
                    {/* Progress Bar could go here */}
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <StepContent
                        step={step}
                        courseId={course.id}
                        nextStepId={nextStepId ?? undefined}
                    />
                </div>
            </main>
        </div>
    );
}
