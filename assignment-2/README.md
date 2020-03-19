# Browser technologies assignment 2
> Work out a case and make the functionality work for every user; regardless of context, browser,device or input type.

## Gekozen use case:
> Ik wil de scores of tijden van een sportwedstrijd kunnen bijhouden tijdens de wedstrijd en opslaan en doorsturen

## Features
Mijn case heeft de volgende drie features:
1. Bijhouden van scores / tijden (notities maken)
2. Het opslaan van je notities
3. Het doorsturen van je notities naar anderen

## Enhancement van de features
Onderstaand een beschrijving van hoe de features uitgewerkt zijn in elke laag. Al dan niet met wat schetsen om de werking van de features duidelijk te maken.

### Functional / reliable
Deze laag is bruikbaar voor alles en iedereen, dingen zien er voor geen meter uit maar de core functionaliteit is te gebruiken.

![Only HTML](git-assets/html-only-1.jpeg)
![Only HTML](git-assets/html-only-2.jpeg)

#### 1. Bijhouden van scores / tijden
De gebruiker kan via een `<input type="text" />` de naam van de wedstrijd neerzetten en in een `textarea` de uitslagen / tijden neerzetten.

#### 2. Het opslaan van notities
De gebruiker kan op een 'opslaan' button klikken om hun notities (danwel tussentijds danwel aan het eind) op te slaan. De data wordt verstuurd naar een database. ~~Hiervoor moet de gebruiker echter wel eerst inloggen?~~

#### 3. Doorsturen van uitslagen / tijden naar anderen
Hier kunnen we queryparams gebruiken om alle content op te slaan, die link, inclusief query params kunnen gebruikers dan delen met vrienden, hierdoor staat die content altijd op de pagina omdat we de query uitlezen.

### Usable
Met deze usable laag gaan we er vanuit dat we o.a. CSS tot onze beschikking hebben waardoor we al wat geavanceerdere design patterns toe kunnen passen en het gebruik van de applicatie al een stukje beter maken.

![With CSS](git-assets/with-css-1.jpeg)
![With CSS](git-assets/with-css-2.jpeg)

#### 1. Bijhouden van scores / tijden
De flow blijft hier in principe hetzelfde alleen ziet het er een stuk overzichtelijker uit omdat we gebruik kunnen maken van de vormgevingsprincipes in een formulier en bijvoorbeeld de labels en velden onder elkaar te zetten.

#### 2. Het opslaan van notities
Notities kunnen nog steeds niet 'echt' opgeslagen worden, daarvoor hebben we danwel session cookies of localStorage nodig. Liefst session cookies dus zodat we het op de server kunnen afhandelen en nog steeds geen JS nodig hebben.

#### 3. Doorsturen van uitslagen / tijden naar anderen
Gebruikers kunnen eveneens op dezelfde manier zoals in de vorige laag uitslagen en tijden doorsturen naar anderen.

### Pleasurable
Alles gaat uit de kast, we hebben toegang to alles wat het web ons biedt waaronder client-side JavaScript, cookies, localStorage, zieke CSS dingen en nog veel meer.

![With JS](git-assets/with-js-1.jpeg)
![With JS](git-assets/with-js-2.jpeg)

#### 1. Bijhouden van scores / tijden
Hier kunnen we nu een soort van progressive disclosure aan toevoegen door de gebruiker op een plusje te laten klikken als ze een volgende plaats willen invullen. Ook kan de gebruiker tussentijds opslaan en altijd door wanneer die wilt als we deze pagina opslaan in de cache en dus ook offline kunnen serveren.

#### 2. Het opslaan van notities
Het opslaan van notities is bovenstaand al een beetje beschreven, echter. We kunnen nu ook de user session gebruiken om de huidige lijst met notities op te slaan en te tonen op een andere gebruiker.

#### 3. Doorsturen van uitslagen / tijden naar anderen
Gebruikers kunnen nu via native sharing op mobiel door navigator.share de boel delen. Als dit niet ondersteund wordt valt 'ie terug op de oudere versie van hoe dit in de vorige laag werkte.