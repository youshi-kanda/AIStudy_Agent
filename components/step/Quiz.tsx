"use client";

import { Quiz as QuizType } from "@/lib/types";
import { useState } from "react";
import clsx from "clsx";
import { AlertCircle, Check } from "lucide-react";

interface QuizProps {
    data: QuizType;
    onComplete: (correct: boolean) => void;
}

export function Quiz({ data, onComplete }: QuizProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        if (!selected) return;
        const correct = data.correct_answer === selected;
        setIsCorrect(correct);
        setSubmitted(true);
        if (correct) {
            onComplete(true);
        }
    };

    const handleRetry = () => {
        setSelected(null);
        setSubmitted(false);
        setIsCorrect(false);
    };

    if (data.type !== "choice") {
        return <div className="text-slate-500 text-sm">Text quiz implementation pending...</div>;
    }

    return (
        <div className="space-y-4">
            <p className="font-medium text-slate-200">{data.question}</p>

            <div className="space-y-2">
                {data.options?.map((option) => {
                    const isSelected = selected === option;
                    const showSuccess = submitted && isCorrect && isSelected;
                    const showError = submitted && !isCorrect && isSelected;

                    return (
                        <button
                            key={option}
                            disabled={submitted && isCorrect}
                            onClick={() => setSelected(option)}
                            className={clsx(
                                "w-full text-left p-4 rounded-xl border transition-all text-sm",
                                isSelected
                                    ? "border-blue-500 bg-blue-500/10 text-blue-200"
                                    : "border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-400",
                                showSuccess && "border-emerald-500 bg-emerald-500/10 text-emerald-200",
                                showError && "border-red-500 bg-red-500/10 text-red-200"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={clsx(
                                    "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                    isSelected ? "border-blue-500 dot-selected" : "border-slate-600",
                                    showSuccess && "border-emerald-500 bg-emerald-500 border-transparent",
                                    showError && "border-red-500"
                                )}>
                                    {showSuccess && <Check className="w-2.5 h-2.5 text-slate-900" />}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    disabled={!selected}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                >
                    Check Answer
                </button>
            ) : (
                <div className={clsx(
                    "mt-4 p-4 rounded-xl border text-sm",
                    isCorrect ? "bg-emerald-950/30 border-emerald-900" : "bg-red-950/30 border-red-900"
                )}>
                    <div className="flex items-start gap-3">
                        {isCorrect ? <Check className="w-5 h-5 text-emerald-500 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                        <div>
                            <p className={clsx("font-bold mb-1", isCorrect ? "text-emerald-400" : "text-red-400")}>
                                {isCorrect ? "Correct!" : "Not quite right"}
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                {data.explanation}
                            </p>
                            {!isCorrect && (
                                <button
                                    onClick={handleRetry}
                                    className="mt-3 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider"
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
