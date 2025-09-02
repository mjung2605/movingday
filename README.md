# Moving Day

"Moving Day" ist ein persönliches Projekt zur privaten Nutzung zwischen mir und meinen Freunden, das aus der Notwendigkeit heraus entstand, beim Umzug Möbel, Gegenstände oder Elektrogeräte loszuwerden oder zu erhalten.

Daraus ist eine kleine Tauschbörse geworden. Es können mit entsprechender Authentifizierung eigene Items hochgeladen oder interessante Items gespeichert werden. Als kleines Bonus-Feature befindet sich auf der Seite eine Checkliste, die Erkenntnisse über den eigenen Umzug teilt.

## Inhalt und Struktur des Projekts
### Code
- Tech Stack: Vue.js, Nuxt.js, TypeScript
- Datenbank: Supabase (Postgres)
- Hosting: Vercel

Die Ordnerstruktur orientiert sich an der von Nuxt erwarteten Struktur.

``/assets/img/`` -> PNGs, die fürs reine Styling in CSS verwendet werden.

``/components/`` -> Komponenten, aus denen sich die Seite zusammensetzt, nach dem Single-File-Component-Prinzip.

``/pages/`` -> die Seiten, die Nuxt als einzelne Web-Pages generiert: index.vue (/) und checklist.vue (/checklist)

``/public/`` -> Öffentlich erreichbare Assets, wie die Bilder der einzelnen Gegenstände (unter ``/public/img/``) oder das Favicon.

``/server/`` -> Serverseitiger Code, der mit der Datenbank kommuniziert. Hier werden POST und GET-Anfragen versendet. Mehr zur DB im folgenden Unterkapitel

### Datenbank
- Modelle folgen

### Repository
- Erklärungen zu Issues folgen
