export const runtime = 'edge';

import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
            <h2 className="text-4xl font-bold mb-4">Not Found</h2>
            <p className="text-slate-400 mb-8">Could not find requested resource</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}
