"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Step } from "@/lib/types";
import { Quiz } from "./Quiz";
import { CheckCircle, ArrowRight, BookOpen, Code2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { markStepAsCompleted } from "@/lib/progress";
import clsx from "clsx";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useRouter } from "next/navigation";

interface StepContentProps {
    step: Step;
    courseId: string;
    nextStepId?: string;
}

export function StepContent({ step, courseId, nextStepId }: StepContentProps) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [activeTab, setActiveTab] = useState<"learn" | "code">("learn");
    const router = useRouter();

    const handleQuizComplete = (correct: boolean) => {
        if (correct) {
            setIsCompleted(true);
            markStepAsCompleted(courseId, step.id, step.order);
            // Note: DB progress update is async but we don't await here for UI responsiveness, 
            // or we could optimistically update.
        }
    };

    const handleNext = () => {
        if (nextStepId) {
            router.push(`/courses/${courseId}/steps/${nextStepId}`);
        } else {
            router.push(`/courses/${courseId}`);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Tab Navigation Bar */}
            <div className="bg-slate-950 border-b border-slate-800 px-6 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                    <button
                        onClick={() => setActiveTab("learn")}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                            activeTab === "learn"
                                ? "bg-slate-800 text-white shadow-sm"
                                : "text-slate-400 hover:text-slate-200"
                        )}
                    >
                        <BookOpen className="w-4 h-4" />
                        Learn
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                            activeTab === "code"
                                ? "bg-blue-900/40 text-blue-200 shadow-sm ring-1 ring-blue-500/20"
                                : "text-slate-400 hover:text-slate-200"
                        )}
                    >
                        <Code2 className="w-4 h-4" />
                        Playground
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === "learn" ? (
                    <div className="flex flex-col md:flex-row h-full">
                        {/* LEFT: Markdown Content */}
                        <div className="flex-1 p-6 md:p-12 overflow-y-auto border-r border-slate-800">
                            <article className="prose prose-invert prose-blue max-w-none mb-16">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <div className="relative group">
                                                    <pre className={className}>
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    </pre>
                                                    <button
                                                        className="absolute top-2 right-2 p-1 bg-slate-700/50 hover:bg-blue-600/50 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1"
                                                        onClick={() => {
                                                            // Auto switch to playground?
                                                            setActiveTab("code");
                                                            // Could also inject this code into editor via Context but for now simple switch
                                                        }}
                                                    >
                                                        <PlayCircle className="w-3 h-3" /> Run in Playground
                                                    </button>
                                                </div>
                                            ) : (
                                                <code className={`${className} bg-slate-900 rounded px-1 py-0.5 text-blue-300 font-mono text-sm`} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {step.content_md}
                                </ReactMarkdown>

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
                            </article>
                        </div>

                        {/* RIGHT: Quiz */}
                        <div className="w-full md:w-[400px] shrink-0 bg-slate-950 p-6 border-l border-slate-800 overflow-y-auto">
                            <div className="sticky top-0">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Check Understanding
                                </h3>

                                <div className="mb-8">
                                    <Quiz
                                        data={step.quiz}
                                        onComplete={handleQuizComplete}
                                    />
                                </div>

                                {isCompleted && (
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
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* PlayGround Tab */
                    <div className="h-full flex flex-col p-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="mb-6 max-w-3xl mx-auto w-full">
                            <h2 className="text-2xl font-bold mb-2 text-slate-100">Python Playground</h2>
                            <p className="text-slate-400">
                                Try writing and running the code examples you just learned.
                                Everything runs locally in your browser!
                            </p>
                        </div>
                        <div className="flex-1 max-w-5xl mx-auto w-full">
                            <CodeEditor height="100%" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
