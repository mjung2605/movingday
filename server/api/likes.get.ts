import { readFile } from 'fs/promises'

// asynchrones Laden der Daten
export default defineEventHandler(async (e) => {

  const query = getQuery(e);
  const user = query.user;

  const likes = JSON.parse(await readFile('data/likes.json', 'utf-8'));


  if (!user || typeof user !== 'string') {
        return []
  }

  return likes[user] || []

})