import { neon } from "@neondatabase/serverless"

export default defineEventHandler(async (e) => {

    const config = useRuntimeConfig();
    const sql = neon(config.DATABASE_URL);
    // gettet user aus der query, dessen likes abgefragt werden sollen
    const user = getQuery(e).user;

    // wenn in query kein user: returnt likes von allen usern
    if (!user || typeof user !== 'string') return await sql`SELECT username, item_id FROM likes`;


    // else wenn in query user: returnt likes von spezifischem user
    return await sql`SELECT item_id FROM likes WHERE username = ${user}`;

})
