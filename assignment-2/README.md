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

#### 1. Bijhouden van scores / tijden
De gebruiker kan via een `<input type="text" />` de naam van de wedstrijd neerzetten en in een `textarea` de uitslagen / tijden neerzetten.

#### 2. Het opslaan van notities
De gebruiker kan op een 'opslaan' button klikken om hun notities (danwel tussentijds danwel aan het eind) op te slaan. De data wordt verstuurd naar een database. ~~Hiervoor moet de gebruiker echter wel eerst inloggen?~~

#### 3. Doorsturen van uitslagen / tijden naar anderen
Hier kunnen we queryparams gebruiken om alle content op te slaan, die link, inclusief query params kunnen gebruikers dan delen met vrienden, hierdoor staat die content altijd op de pagina omdat we de query uitlezen.

### Usable
Met deze usable laag gaan we er vanuit dat we o.a. CSS tot onze beschikking hebben waardoor we al wat geavanceerdere design patterns toe kunnen passen en het gebruik van de applicatie al een stukje beter maken.

#### 1. Bijhouden van scores / tijden
Some text

#### 2. Het opslaan van notities
Some more text

#### 3. Doorsturen van uitslagen / tijden naar anderen
Even more text

### Pleasurable
Alles gaat uit de kast, we hebben toegang to alles wat het web ons biedt waaronder client-side JavaScript, cookies, localStorage, zieke CSS dingen en nog veel meer.

#### 1. Bijhouden van scores / tijden
Some explanation

#### 2. Het opslaan van notities
Some explanation, but then more

#### 3. Doorsturen van uitslagen / tijden naar anderen
Ja