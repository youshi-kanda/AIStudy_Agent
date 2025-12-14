'use client'

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html>
            <body className="bg-slate-950 text-white">
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h1 className="text-3xl font-bold mb-4 text-red-500">Critical Error</h1>
                    <p className="mb-8 text-slate-400">Application failed to load.</p>
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 mb-6 max-w-2xl w-full overflow-auto">
                        <p className="font-mono text-sm text-red-400">
                            {error.message}
                        </p>
                    </div>
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
                    >
                        Retry
                    </button>
                </div>
            </body>
        </html>
    )
}
