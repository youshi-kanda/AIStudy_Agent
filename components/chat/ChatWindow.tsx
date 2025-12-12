"use client";

import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

export function ChatWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, append, isLoading } = useChat({
        api: "/api/chat",
    } as any) as any;
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        console.log("ChatWindow mounted");
        scrollToBottom();
    }, [messages]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        console.log("Form submitted");
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");

        await append({
            role: "user",
            content: userMessage,
        });
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all z-[9999]",
                    isOpen ? "bg-slate-800 text-slate-400 rotate-90" : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-110"
                )}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            <div
                className={clsx(
                    "fixed bottom-24 right-6 w-[400px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col transition-all z-[9999] overflow-hidden",
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto h-[600px]"
                        : "opacity-0 translate-y-10 pointer-events-none h-0"
                )}
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200">AI Mentor</h3>
                        <p className="text-xs text-slate-400">Powered by Gemini</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-slate-500 mt-20">
                            <Bot className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">Hi! I can answer questions about this course.</p>
                            <p className="text-xs mt-2">Try asking: "What is an API?"</p>
                        </div>
                    )}

                    {messages.map((m: any) => (
                        <div
                            key={m.id}
                            className={clsx(
                                "flex gap-3",
                                m.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div
                                className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    m.role === "user" ? "bg-slate-800" : "bg-blue-600/20 text-blue-400"
                                )}
                            >
                                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div
                                className={clsx(
                                    "p-3 rounded-2xl text-sm max-w-[80%]",
                                    m.role === "user"
                                        ? "bg-slate-800 text-slate-200 rounded-tr-sm"
                                        : "bg-blue-950/30 text-slate-300 border border-blue-900/30 rounded-tl-sm"
                                )}
                            >
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-blue-950/30 p-3 rounded-2xl rounded-tl-sm border border-blue-900/30 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleFormSubmit} className="p-4 border-t border-slate-800 bg-slate-900/30">
                    <div className="relative">
                        <input
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
