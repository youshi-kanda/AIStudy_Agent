import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // DEBUG: Temporarily bypassing Supabase to verify app boot
    return NextResponse.next({
        request,
    })

    /*
    let supabaseResponse = NextResponse.next({
        request,
    })
    
    // ... (Original logic commented out or removed for brevity in this debug step)
    // To restore, we will revert this file.
    */
}
