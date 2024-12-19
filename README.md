# Projektas “Film Analysis Lounge”

Taikomosios srities objektai:

Filmas -> Teorija -> Komentarai

--------------------------------------------
Sistemos paskirtis:

Sistemos tikslas – sukurti forumą, skirtą filmų gerbėjams susirinkti ir aptarti savo teorijas apie filmus. Tai vieta, kur vartotojai gali kurti temas, bendrauti tarpusavyje, komentuoti ir įvertinti kitų teorijas. Sistema taip pat skatina komunikacija tarp bendraminčių ir padeda atrasti naujas filmų rekomendacijas.

--------------------------------------------


+------------------------------------------+
|                  Frontend                |
|              (React aplikacija)          |
|                                          |
|  - Temų kūrimas/redagavimas              |
|  - Komentarų ir atsakymų valdymas        |
|  - Balsavimo sistema                     |
|  - Autentifikacija (JWT)                 |
+------------------------------------------+
                   |
                   v
+------------------------------------------+
|                  Backend                 |
|          (.NET API su C#)                |
|                                          |
|  - Vartotojų autentifikacija             |
|  - CRUD operacijos temoms ir komentarams |
|  - Balsavimo logika                      |
|  - Duomenų saugykla (MySQL)              |
+------------------------------------------+

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

GET /api/topics
Gaukite visas sukurtas temas.

Atsakymas:
json
Copy code
[
  {
    "id": 1,
    "title": "Filmų teorija apie XYZ",
    "content": "Turinys apie teoriją",
    "userId": 1
  }
]
POST /api/topics
Sukurkite naują temą.

Užklausos kūnas:
json
Copy code
{
  "title": "Nauja teorija",
  "content": "Teorijos turinys",
  "userId": 1
}
Atsakymas:
json
Copy code
{
  "id": 1,
  "title": "Nauja teorija",
  "content": "Teorijos turinys"
}
PUT /api/topics/{id}
Redaguokite esamą temą.

Užklausos kūnas:
json
Copy code
{
  "title": "Atnaujinta teorija",
  "content": "Atnaujintas turinys"
}
Atsakymas:
json
Copy code
{
  "id": 1,
  "title": "Atnaujinta teorija",
  "content": "Atnaujintas turinys"
}
DELETE /api/topics/{id}
Pašalinkite temą.

Atsakymas: 204 No Content
Komentarų API

GET /api/topics/{topicId}/comments
Gaukite visus komentarus apie konkrečią temą.

Atsakymas:
json
Copy code
[
  {
    "id": 1,
    "content": "Komentaro turinys",
    "userId": 2
  }
]
POST /api/topics/{topicId}/comments
Pridėkite naują komentarą temai.

Užklausos kūnas:
json
Copy code
{
  "content": "Mano komentaras apie teoriją",
  "userId": 2
}
Atsakymas:
json
Copy code
{
  "id": 1,
  "content": "Mano komentaras apie teoriją"
}

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


