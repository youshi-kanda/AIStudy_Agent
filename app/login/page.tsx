import { login, signup } from './actions'

export default function LoginPage({ searchParams }: { searchParams: { message?: string, error?: string } }) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-sm space-y-8 rounded-lg border border-slate-800 bg-slate-900/50 p-8 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Welcome to AI Study Agent
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to track your progress and access AI mentor.
                    </p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 placeholder-slate-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 placeholder-slate-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {(searchParams.message || searchParams.error) && (
                        <div className={`p-3 rounded-md text-sm ${searchParams.error ? "bg-red-900/30 text-red-400 border border-red-900/50" : "bg-green-900/30 text-green-400 border border-green-900/50"}`}>
                            {searchParams.error || searchParams.message}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            formAction={login}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            Sign in
                        </button>
                        <button
                            formAction={signup}
                            className="group relative flex w-full justify-center rounded-md border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
