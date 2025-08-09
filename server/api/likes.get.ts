import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (e) => {

    // gettet user aus der query, dessen likes abgefragt werden sollen
    const user = getQuery(e).user;
    if (!user || typeof user !== 'string') return [];


    const store = getStore("likes-store");
    const allLikesJson = await store.get("allLikes");
    const allLikes = allLikesJson ? JSON.parse(allLikesJson) : {}

    return allLikes[user] || []
})
