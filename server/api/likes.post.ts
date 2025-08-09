// to parse and write json
import { readFile, writeFile } from 'fs/promises'

export default defineEventHandler(async (event) => {

  const body = await readBody(event); // user, itemId, isLiked

  console.log('POST /api/likes body:', body);

  const likes = JSON.parse(await readFile('data/likes.json', 'utf-8'));


  if (!likes[body.user]) likes[body.user] = []
  // Falls der User noch nicht in der Datei steht, leeres Array anlegen

  if (body.isLiked) {
    
    if (!likes[body.user].includes(body.itemId)) {
      likes[body.user].push(body.itemId) // ID hinzufügen, wenn noch nicht drin
    }
  } else {
    // Fall: Der User klickt "Nein, nicht mehr interessiert"
    likes[body.user] = likes[body.user].filter((id: any) => id !== body.itemId)
    // Entfernt die ID aus dem Array
  }

  await writeFile('data/likes.json', JSON.stringify(likes, null, 2))

  console.log('Likes gespeichert:', likes);
  // Speichert die geänderte Likes-Struktur wieder in die Datei
  // null, 2 sorgt für schön formatierten JSON-Text

  return { success: true } // Antwort an den Client

})
