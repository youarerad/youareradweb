/* supabase enabled both access to the Supabase API and our Supabase database. Non-clinical data is stored on Supabase's PostgresSQL database, which affords great security, realtime subscriptions, auth, and storage. */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseKey)
