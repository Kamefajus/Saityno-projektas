# Projektas “Film Analysis Lounge”

Taikomosios srities objektai:

Filmas -> Teorija -> Komentarai

--------------------------------------------
Sistemos paskirtis:

Sistemos tikslas – sukurti forumą, skirtą filmų gerbėjams susirinkti ir aptarti savo teorijas apie filmus. Tai vieta, kur vartotojai gali kurti temas, bendrauti tarpusavyje, komentuoti ir įvertinti kitų teorijas. Sistema taip pat skatina komunikacija tarp bendraminčių ir padeda atrasti naujas filmų rekomendacijas.

--------------------------------------------

Struktūrinė diagrama:



![image](https://github.com/user-attachments/assets/52839e49-3e4b-4e9e-a566-0138403cb884)



--------------------------------------------


Pagrindinio lango eskizas:

![image](https://github.com/user-attachments/assets/fe0b1a63-a591-454a-84fb-81455c1e9f8a)

Prisijungimo ir registracijos lango eskizas:

![image](https://github.com/user-attachments/assets/d111c853-900b-42a6-97d3-288b5100626b)

Filmų įrašų ir komentarų atvaizdavimo eskizas:

![image](https://github.com/user-attachments/assets/80f946d3-f607-48a9-b2dd-5d3ca426c1ed)

Sukurti naują filmą eskizas:

![image](https://github.com/user-attachments/assets/a4d07810-3813-4f1b-bf63-324326ef3ee6)


--------------------------------------------

Sukurtas prisijungimo ir registracijos langas:

![image](https://github.com/user-attachments/assets/04934c32-1c50-4b0e-a8d7-79194caff939)

Sukurtas pagrindinis langas:

![image](https://github.com/user-attachments/assets/a7642cc8-cc09-4939-9720-b40bd36eb1e1)

Filmų įrašų ir komentarų atvaizdavimo sukurtas langas:

![image](https://github.com/user-attachments/assets/e6041fd2-eb3a-486f-a2cd-09a5246c92e6)

Naujo filmo sukurimo langas:

![image](https://github.com/user-attachments/assets/a52a12be-c848-4215-abe4-e8fc4b61645b)


--------------------------------------------


Temų kūrimas

• Vartotojai gali kurti naujas diskusijų temas, skirtas filmų teorijoms.

• Kiekviena tema turi pavadinimą, turinį ir galimybę pridėti filmų rekomendacijas.

• Temos kūrėjas gali redaguoti arba trinti savo temas.

--------------------------------------------

Komentarai ir atsakymai

• Kiekvienoje temoje vartotojai gali:

• Pateikti savo teorijas ir mintis.

• Atsakyti į kitų komentarus, skatindami diskusiją.

--------------------------------------------

Technologijų aprašymas:

•	JWT bus naudojamas vartotojo autentifikacijai po prisijungimo. Tai leidžia saugiai ir efektyviai tvarkyti prisijungimo sesijas.

•	React bus naudojamas dinamiškam ir interaktyviam vartotojo sąsajos kūrimui. React leidžia kurti komponentų struktūras, kurios efektyviai reaguoja į vartotojo veiksmus.

• Back-end kūrybai bus naudojama .NET (C#)

• Duomenų bazė bus kuriama su MySql


--------------------------------------------

GET /api/test
Gaukite testinius duomenis iš duomenų bazės.
[
  {
    "id": 1,
    "title": "Filmo pavadinimas",
    "description": "Filmo aprašymas",
    "createdAt": "2023-12-01T12:00:00Z",
    "userId": "user1"
  }
]

GET /api/movies
Gaukite visų filmų sąrašą.
[
  {
    "id": 1,
    "title": "Filmo pavadinimas",
    "description": "Filmo aprašymas",
    "createdAt": "2023-12-01T12:00:00Z",
    "userId": "user1"
  }
]
POST /api/movies
Sukurkite naują filmą.
Užklausos kūnas:

 
 
{
  "title": "Filmo pavadinimas",
  "description": "Filmo aprašymas"
}
Atsakymas:

 
 
{
  "id": 1,
  "title": "Filmo pavadinimas",
  "description": "Filmo aprašymas",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
GET /api/movies/{movieId}
Gaukite konkretų filmą pagal ID.

Atsakymas:

 
 
{
  "id": 1,
  "title": "Filmo pavadinimas",
  "description": "Filmo aprašymas",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
PUT /api/movies/{movieId}
Atnaujinkite filmą pagal ID.

Užklausos kūnas:

 
 
{
  "title": "Atnaujintas filmo pavadinimas",
  "description": "Atnaujintas filmo aprašymas"
}
Atsakymas:

 
 
{
  "id": 1,
  "title": "Atnaujintas filmo pavadinimas",
  "description": "Atnaujintas filmo aprašymas",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
DELETE /api/movies/{movieId}
Pašalinkite filmą pagal ID.

GET /api/movies/{movieId}/posts
Gaukite visus konkretaus filmo pranešimus.

Atsakymas:

 
 
[
  {
    "id": 1,
    "title": "Pranešimo pavadinimas",
    "body": "Pranešimo turinys",
    "createdAt": "2023-12-01T12:00:00Z",
    "userId": "user1"
  }
]
POST /api/movies/{movieId}/posts
Sukurkite naują pranešimą filme.

Užklausos kūnas:

 
 
{
  "title": "Naujo pranešimo pavadinimas",
  "body": "Naujo pranešimo turinys"
}
Atsakymas:

 
 
{
  "id": 1,
  "title": "Naujo pranešimo pavadinimas",
  "body": "Naujo pranešimo turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
GET /api/movies/{movieId}/posts/{postId}
Gaukite konkretų pranešimą filme.

Atsakymas:

 
 
{
  "id": 1,
  "title": "Pranešimo pavadinimas",
  "body": "Pranešimo turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
PUT /api/movies/{movieId}/posts/{postId}
Atnaujinkite konkretų pranešimą filme.

Užklausos kūnas:

 
 
{
  "title": "Atnaujintas pranešimo pavadinimas",
  "body": "Atnaujintas pranešimo turinys"
}
Atsakymas:

 
 
{
  "id": 1,
  "title": "Atnaujintas pranešimo pavadinimas",
  "body": "Atnaujintas pranešimo turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
DELETE /api/movies/{movieId}/posts/{postId}
Pašalinkite konkretų pranešimą filme.

GET /api/movies/{movieId}/posts/{postId}/comments
Gaukite visus konkretaus pranešimo komentarus.

Atsakymas:

 
 
[
  {
    "id": 1,
    "content": "Komentaro turinys",
    "createdAt": "2023-12-01T12:00:00Z",
    "userId": "user1"
  }
]
POST /api/movies/{movieId}/posts/{postId}/comments
Sukurkite naują komentarą pranešime.

Užklausos kūnas:

 
 
{
  "content": "Naujo komentaro turinys"
}
Atsakymas:

 
 
{
  "id": 1,
  "content": "Naujo komentaro turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
GET /api/movies/{movieId}/posts/{postId}/comments/{commentId}
Gaukite konkretų komentarą pranešime.

Atsakymas:

 
 
{
  "id": 1,
  "content": "Komentaro turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
PUT /api/movies/{movieId}/posts/{postId}/comments/{commentId}
Atnaujinkite konkretų komentarą pranešime.

Užklausos kūnas:

 
 
{
  "content": "Atnaujintas komentaro turinys"
}
Atsakymas:

 
 
{
  "id": 1,
  "content": "Atnaujintas komentaro turinys",
  "createdAt": "2023-12-01T12:00:00Z",
  "userId": "user1"
}
DELETE /api/movies/{movieId}/posts/{postId}/comments/{commentId}
Pašalinkite konkretų komentarą pranešime.

--------------------------------------------

# Naudojimo pavyzdžiai

--------------------------------------------

Prisijungimas


• Prisijungimo metu vartotojai pateikia savo prisijungimo duomenis (vartotojo vardą ir slaptažodį).

• Autentifikacija vyksta naudojant JWT žetoną, kuris saugomas naršyklėje.

--------------------------------------------

Temos kūrimas

• Vartotojas sukuria temą, pateikdamas pavadinimą ir turinį. Sistema grąžina sėkmingai sukurtos temos informaciją.

• Vartotojas pasirenka temą ir prideda savo komentarą.

--------------------------------------------

Išvados

Projektas Film Analysis Lounge suteikia galimybę filmų mėgėjams bendrauti ir kurti diskusijas apie savo teorijas. Aplikacija išsiskiria:

Intuityviu ir vartotojui draugišku sąsajos dizainu.
Saugiu vartotojų autentifikavimu naudojant JWT.
Lankstumu ir galimybėmis interaktyviai valdyti turinį.
Projektas įkūnija modernių web technologijų privalumus, užtikrindamas funkcionalumą ir patikimumą.


