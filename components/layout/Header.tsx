import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { logout } from "@/app/login/actions";
import { LogOut, User } from "lucide-react";

export default async function Header() {
    const supabase = await createClient();

    let user = null;
    try {
        const { data } = await supabase.auth.getUser();
        user = data.user;
    } catch (error) {
        console.error("Error fetching user in Header:", error);
        // User remains null, app continues to render
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-sm">AI</span>
                    </div>
                    Study Agent
                </Link>

                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-400 hidden sm:block">
                                {user.email}
                            </div>
                            <form action={logout}>
                                <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Sign out</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
