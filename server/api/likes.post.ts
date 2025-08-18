import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (e) => {

    const config = useRuntimeConfig();
    const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY)

    const body = await readBody(e)  // user, itemId, isLiked 
    if (!body.user || !body.itemId) {
        return { success: false, message: 'User und/oder itemId fehlen' }
    }



    // benutzt allLikes von user, falls es existiert, sonst neuer array erstellt
    if (body.isLiked) {
        const { error } = await supabase.from('likes').insert({user_id: body.user, item_id: body.itemId});
        if ( error ) console.error("Einfügen von Like hat nicht funktioniert:", error.message);
    } else {
        const { error } = await supabase.from('likes').delete().eq("user_id", body.user).eq("item_id", body.itemId);
        if ( error ) console.error("Löschen von Like hat nicht funktioniert:", error.message);
    }

    return { success: true }
})
