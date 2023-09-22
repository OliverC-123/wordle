Krav for opstart --
Node.js (https://nodejs.org/en/download)

Tager udgangspunkt i at det hele bliver kørt i Visual Studio Code, enten powershell eller command prompt

Opstart in console --
npm i (installer node_modules pakker der er brugt)
Der er muligvis behov for at køre 'npm install -g json-server' for at installere alle depedencies

Derefter --
(Kan gøres i samme console vindue)
npm run start (Vil starte projektet i windows default browser)

Åben command prompt --
find frem til data folder der indeholder db.json
kør 'json-server --watch db.json --port 3001' 
Dette starter server der hoster listen af ord.

Reload browseren --
Wordle burde nu virker :)