"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Terminal } from 'lucide-react';
import { usePyodide } from '@/hooks/usePyodide';
import clsx from 'clsx';

interface CodeEditorProps {
    initialCode?: string;
    height?: string;
}

export function CodeEditor({ initialCode = "# Write your Python code here\nprint('Hello, AI Agent!')", height = "400px" }: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const { runPython, isRunning, output, clearOutput } = usePyodide();

    return (
        <div className="flex flex-col border border-slate-700 rounded-xl overflow-hidden bg-slate-900 shadow-xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Editor</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={clearOutput}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        title="Clear Console"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => runPython(code)}
                        disabled={isRunning}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold transition-all",
                            isRunning
                                ? "bg-slate-700 text-slate-400 cursor-wait"
                                : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/50"
                        )}
                    >
                        <Play className="w-4 h-4 fill-current" />
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-[500px]">
                {/* Editor Area */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-700 relative">
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            padding: { top: 16 },
                        }}
                    />
                </div>

                {/* Console Output Area */}
                <div className="h-1/3 md:h-auto md:w-1/3 bg-slate-950 p-4 font-mono text-sm overflow-y-auto flex flex-col">
                    <div className="flex items-center gap-2 text-slate-500 mb-2 pb-2 border-b border-slate-800">
                        <Terminal className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Console</span>
                    </div>

                    <div className="flex-1 space-y-1">
                        {output.length === 0 && (
                            <span className="text-slate-600 italic">Output will appear here...</span>
                        )}
                        {output.map((line, index) => (
                            <div key={index} className="whitespace-pre-wrap break-all text-slate-300">
                                {line}
                            </div>
                        ))}
                        {isRunning && (
                            <div className="animate-pulse text-green-500">_</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
