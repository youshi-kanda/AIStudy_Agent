import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // Create local supabase client for middleware
    // We need to properly handle cookie setting for both request and response
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase environment variables in middleware!");
    }

    const supabase = createServerClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseKey || 'placeholder',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    try {
        await supabase.auth.getUser()
    } catch (error) {
        // If this fails (e.g. missing env vars in build phase or misconfiguration),
        // we should not crash the entire app. Just proceed without refreshing session.
        console.error("Middleware auth check failed:", error);
    }

    return supabaseResponse
}
