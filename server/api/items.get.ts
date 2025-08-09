// require(...) ist CommonJS syntax, import... from... ist ESM Syntax - Nuxt 3 'basiert auf ESM


import { readFile } from 'fs/promises'

// asynchrones Laden der Daten
export default defineEventHandler(async () => {

  const items = JSON.parse(await readFile('data/items.json', 'utf-8'));

  return items;

})