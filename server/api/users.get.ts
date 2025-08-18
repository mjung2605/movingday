import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {

    const config = useRuntimeConfig()
    const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY)

    const { data, error } = await supabase.from('users').select();

    if (error) console.error("Error beim Laden der User:", error.message);
    return data;

})