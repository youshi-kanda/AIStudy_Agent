'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 mb-6 max-w-2xl w-full overflow-auto">
                <p className="font-mono text-sm text-red-400 break-words">
                    {error.message || "Unknown Error"}
                </p>
                {error.digest && (
                    <p className="text-xs text-slate-500 mt-2">Digest: {error.digest}</p>
                )}
            </div>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
