import { neon } from "@neondatabase/serverless"

export default defineEventHandler(async (e) => {

    const config = useRuntimeConfig();
    const sql = neon(config.DATABASE_URL);

    const body = await readBody(e)  // user, itemId, isLiked 
    if (!body.user || !body.itemId) {
        return { success: false, message: 'User und/oder itemId fehlen' }
    }

    const rows = await sql`SELECT items FROM likes WHERE user = ${body.user}`;
    let items = rows[0]?.items || [];

    // benutzt allLikes von user, falls es existiert, sonst neuer array erstellt
    if (body.isLiked) {
        await sql`
          INSERT INTO likes (username, item_id)
          VALUES (${body.user}, ${body.itemId})
          ON CONFLICT (username, item_id) DO NOTHING
        `
    } else {
        await sql`
          DELETE FROM likes
          WHERE username = ${body.user} AND item_id = ${body.itemId}
        `
    }

    await sql`
      INSERT INTO likes (user, items)
      VALUES (${body.user}, ${items})
      ON CONFLICT (user) DO UPDATE
      SET items = EXCLUDED.items
    `;

    return { success: true }
})
