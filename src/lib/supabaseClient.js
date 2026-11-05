import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vkvhcsvdizgmxtnlbjsl.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_m_MH6OlgQu1BBfJa32h0cg_mDSWILJD'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)