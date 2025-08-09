import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (e) => {

    const body = await readBody(e)  // user, itemId, isLiked 
    if (!body.user || !body.itemId) {
        return { success: false, message: 'User und/oder itemId fehlen' }
    }

    const store = getStore("likes-store");
    const likesJson = await store.get("allLikes");
    const likes = likesJson ? JSON.parse(likesJson) : {}

    // benutzt allLikes von user, falls es existiert, sonst neuer array erstellt
    likes[body.user] = likes[body.user] || []

    if (body.isLiked) {
    
      if (!likes[body.user].includes(body.itemId)) {
          likes[body.user].push(body.itemId)
      }
    } else {
    
        likes[body.user] = likes[body.user].filter((id: any) => id !== body.itemId)
    }

    // writes db
    await store.set("allLikes", JSON.stringify(likes))

    return { success: true }
})
