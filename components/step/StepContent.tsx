"use client";

import { Step } from "@/lib/types";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Quiz } from "./Quiz";
import { markStepAsCompleted } from "@/lib/progress";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface StepContentProps {
    step: Step;
    courseId: string;
    nextStepId?: string;
}

export function StepContent({ step, courseId, nextStepId }: StepContentProps) {
    const [completed, setCompleted] = useState(false);
    const router = useRouter();

    const handleQuizComplete = () => {
        setCompleted(true);
        // Calculate next order (current order + 1) roughly, or just pass a flag.
        // Ideally we pass full context, but for MVP:
        markStepAsCompleted(courseId, step.id, step.order + 1);
    };

    const handleNext = () => {
        if (nextStepId) {
            router.push(`/courses/${courseId}/steps/${nextStepId}`);
        } else {
            router.push(`/courses/${courseId}`);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full">
            {/* LEFT: Content */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto border-r border-slate-800">
                <div className="prose prose-invert prose-blue max-w-none">
                    <ReactMarkdown
                        components={{
                            // Custom components for styling
                            code({ node, inline, className, children, ...props }: any) {
                                return (
                                    <code
                                        className={`${className} bg-slate-900 rounded px-1 py-0.5 text-blue-300 font-mono text-sm`}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            pre({ children }: any) {
                                return (
                                    <div className="relative group">
                                        <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto border border-slate-800 my-4">
                                            {children}
                                        </pre>
                                        {/* Copy button could go here */}
                                    </div>
                                );
                            }
                        }}
                    >
                        {step.content_md}
                    </ReactMarkdown>
                </div>

                {/* References */}
                {step.references && step.references.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Sources & Further Reading
                        </h3>
                        <ul className="space-y-2">
                            {step.references.map((ref, i) => (
                                <li key={i}>
                                    <a
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2"
                                    >
                                        {ref.title}
                                    </a>
                                    {ref.note && <span className="text-slate-500 text-xs ml-6 block">{ref.note}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* RIGHT: Action / Quiz */}
            <div className="w-full md:w-[400px] shrink-0 bg-slate-900/50 p-6 border-l border-slate-800 overflow-y-auto">
                <div className="sticky top-0">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                        Review Challenge
                    </h3>

                    <div className="mb-8">
                        <Quiz
                            data={step.quiz}
                            onComplete={handleQuizComplete}
                        />
                    </div>

                    {completed && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-emerald-400 mb-1">Excellent!</h4>
                            <p className="text-slate-400 text-sm mb-4">Step completed.</p>

                            <button
                                onClick={handleNext}
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {nextStepId ? "Next Step" : "Finish Course"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
