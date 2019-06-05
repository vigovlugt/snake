# Snake
## Informatie
Snakte is een spel dat voor het eerst werd gespeeld in 1976 in arcades. In dit spel speel je als een lijn (Snake) waar je steeds groter moet worden door de punten (appels) te pakken. Hierdoor blijf je groter worden tot je tegen een muur botst of tegen jezelf. Dit spel kan ook in multiplayer gespeeld worden. Het enige verschil hier is dat het een battle royale. Het doel hierbij is nu niet alleen veel punten halen maar ook om het langst te blijven leven. Bij dit spel gebruik je de W,A,S,D knoppen om te bewegen.

## Technische informatie
Dit project is gemaakt in NodeJS in JavaScript en TypeScript. Typescript wordt gebruikt om Typescript te transpilen naar Javascript. Typescript is een strong-typed superset van javascript dat gecompiled kan worden naar native javascript. Npm is de package manager van NodeJS (Node Package Manager) waar alle libraries van zijn geïnstalleerd. Server-side gebruikt het express voor de server, socket.io om multiplayer te verzorgen via websockets. Client side gebruikt het native canvas om de game te renderen en socket.io-client om te connecten met de websockets. Websockets worden gebruikt om een connectie te maken tussen de client en de server waardoor gamestate en client inputs kunnen worden uitgewisseld.

## Setup
1. Installeer node en npm via https://nodejs.org/en/download/ 
2. Clone de repo: git clone https://www.github.com/vigovlugt/snake.git
3. Installeer de packages via: npm run install-server && npm run install-client
4. Transpile de typescript naar javascript: npm run build-server
5. Bundle de clientside scripts via webpack: npm run build-client
6. Run de server: npm start
7. Open de game in je browser op http://localhost:3001

Als je het spel multiplayer wil spelen dan kan je de volgende stappen doen:
1. Zorg dat het andere device op hetzelfde netwerk zit
2. Run ifconfig (Mac) / ipconfig (PC)
3. Kopieer je ip en open de website op ip:3001 op een ander device

## Toekomst
Als we verder aan dit project kunnen werken zouden we in plaats van menselijke snakes ook AI snakes kunnen toevoegen. Hierdoor leren we veel over AI en hoe we dit op een praktische manier kunnen gebruiken en doordat het AI tegen menselijke spelers speelt, kan je goed kijken of het AI daadwerkelijk beter wordt en of de AI misschien beter wordt dan mensen. Omdat het multiplayer is kan je de AI tegen elkaar laten trainen en zullen er waarschijnlijk verschillende speelstijlen ontstaan. Sommige AIs zullen zich focussen op blijven overleven, sommige gaan voor het fruit om zo'n hoog mogelijke score te halen en andere gaan proberen andere spelers af te maken. 
Door AI aan dit spel toe te passen leer je veel over belangrijke libraries zoals TensorFlow omdat dat nu ook voor Javascript beschikbaar is. Je leert over neurale netwerken en over genetische evolutie. Dit kan je op veel verschillende andere vlakken toepassen. 
