// require(...) ist CommonJS syntax, import... from... ist ESM Syntax - Nuxt 3 'basiert auf ESM


import { createClient } from '@supabase/supabase-js'

// asynchrones Laden der Daten
export default defineEventHandler(async () => {

    const config = useRuntimeConfig()
    const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY)

    // dereferenzierung /// supapase returnt immer promise (?), deswegen await, deswegen in async function
    const { data, error } = await supabase.from('items').select();

    if (error) console.error("Error beim Laden der Items:", error.message);
    return data;

})