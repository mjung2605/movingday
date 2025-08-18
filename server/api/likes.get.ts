import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (e) => {

    const config = useRuntimeConfig();

    const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);


    // gettet ggf user aus der query, dessen likes abgefragt werden sollen
    const user = getQuery(e).user; // user || null

    
    if (!user) {

        // wenn in query kein user: returnt likes von allen usern
        const { data, error } = await supabase.from('likes').select();
        if (error) console.error("Error beim Laden aller Likes:", error.message); 
        return data;

    } else {

        // else wenn in query user: returnt likes von spezifischem user, sortiert nach like-datum (für potenzielle like-page)
        const { data, error } = await supabase.from('likes').select().eq("id", user).order("created_at", { ascending: false });
        if (error) console.error("Error beim Laden der bestimmten  Likes:", error.message); 
        return data;

    }

})
