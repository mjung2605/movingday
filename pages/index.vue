<template>

    <div class="content">
        <h1>Moving Day</h1>
        <h2>Meikis kleine Umzugshilfe :)</h2>

        <div v-if="!authOk" class="auth">
            <p class="pw">Bitte gebe das Passwort ein (brumm brumm):</p>
            <input type="text" v-model="inputPw" placeholder="Passwort"/>
            <button @click="checkPw">Einloggen</button>
            <p v-if="wrongPw">Falsches Passwort :(</p>
        </div>
        <div v-else-if="!user" class="auth">
            <p>Hi! Wer bist du?</p>
            <button @click="user = 'Kathi'">Kathi</button>
            <button @click="user = 'Jana'">Jana</button>
        </div>
        <div v-else class="auth items">
            <h3>Hi {{ user }}!</h3>

            <p>Für Tipps und alles was mir zum Umzug einfällt: <a href="/checklist">Umzugs-Checklist</a></p>
            <p>Stöber gerne durch unsere übriggebliebenen Gegenstände und Möbel und like die, an denen du Interesse hast!</p>
            <p>Für manche der gut erhaltenen bzw. teureren würde ich vielleicht etwas Geld nehmen, aber weit unter dem Marktwert bzw. sehr verhandelbar :)</p>
            <p>Wenn ihr ein Bild von meiner Wand seht, dann hab ich kein Bild von dem Ding! AAAAHHHHH</p>

            <div v-for="i in items" :key="i.id" class="card">

                <img :src=i.image alt="Bild des Objekts" width="200px">
                <h3>{{ i.title }}</h3>
                <p>{{ i.desc }}</p>
                <button 
                    v-if="!likes.includes(i.id)" 
                    @click="toggleLike(i.id, true)">
                    Interessiert
                </button>
                <button 
                    v-else
                    @click="toggleLike(i.id, false)">
                    Nicht Interessiert
                </button>

            </div>

        </div>

    </div>

    

</template>


<style lang="css">
    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        background-color: linen;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    .content {
        width: 300px;
    }
    h1 {
        margin: 8px;
        font-size: 40px;
    }
    h2 {
        margin: 8px;
        font-size: large;
        font-weight: 500;
    }
    h3 {
        margin: 8px;
        font-size: medium;
    }
    p {
        margin: 8px;

    }
    img {
        margin: 8px;
        border: solid 1px lightgrey;
        border-radius: 4px;
    }
    button {
        margin: 8px;
        padding: 8px;
        background-color: tan;
        border: none;
        border-radius: 4px;
        color: white;
    }
    input {
        border-radius: 4px;
        margin: 4px;
        border: solid 1px lightgrey;
        padding: 8px;
    }
    .auth {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        margin-top: 8px;
        padding: 8px;
        padding-bottom: 12px;
        border: solid 1px lightgrey;
        border-radius: 4px;
    }
    .items {
        margin-bottom: 100px;
    }



</style>



<script setup>


    /* Very Simple Auth Logic */
    const config = useRuntimeConfig();
    const pw = config.public.PASSWORT;

    const inputPw = ref('');
    const wrongPw = ref(false);
    const authOk = ref(false);

    const user = ref('');

    function checkPw() {
        if (inputPw.value === pw) {
            wrongPw.value = false;
            authOk.value = true;
        }
        else {
            wrongPw.value = true;
        }
    }

    /* Items */

    // destrukturierung gettet direkt data eigenschaft aus dem useFetch Promise AS ITEMS -> später aufruf als items.value... weils sonst alles data heißen würde
    const {data : items} = await useFetch('/api/items');

    /* Likes */

    const likes = ref([]);

    async function loadLikes() {
        const { data } = await useFetch(`/api/likes?user=${user.value}`);
        if (data.value) likes.value = data.value;
    }

    async function toggleLike(itemId, isLiked) {
        
        // wenn etwas geliked werden soll - live update (ref)
        if (isLiked) {
        // wenn nicht schon geliked, dann hinzufügen zu likes array
            if (!likes.value.includes(itemId)) {
                likes.value.push(itemId)
            }
        } else {
            // wenn etwas entliked werden soll - live update (ref)
            likes.value = likes.value.filter(id => id !== itemId)
        }

        // asynchrone kommunikation mit backend - POST
        try {
            const res = await fetch('/api/likes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: user.value,
                    itemId: itemId,
                    isLiked: isLiked
                })
            })

            const json = await res.json();
            console.log('json antwort:', json);

        } catch (e) {
            console.error('Fehler', e)
        }
        
    }

    // sobald usesr gesetzt ist, laden die likes
    watch(user, async (newUser) => {
        if (newUser) {
        await loadLikes()
    }
})

</script>