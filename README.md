Aplikacija omogoča sledenje filmov in serij, ki si jih uporabnik želi pogledati, jih gleda oz. si jih je ogledal v preteklosti. Uporabnik lahko na seznam doda poljuben film ali serijo, doda njegovo oceno (ali pusti prazno polje in oceno doda kasneje) ter izbere med tipom vsebine (serija in film). S klikom na gumb "Dodaj" se film/serija doda v ustrezno tabelo filmov oz. serij in prikaže pod vnosnimi polji. Znotraj tabele lahko uporabnik spreminja status filma in sicer na "completed", "watching" ali "planed". Lahko tudi dodaja oz. spreminja oceno in izbriše posamezen film oz. serijo. 


Navodila za zagon:
1. Kloniranje repozitorija 
git clone https://github.com/maticmerela/MovieTracker.git
2. Postavi se v root mapo projekta. 
3. Zgradi docker image: 
sudo docker compose up --build 

oz. če želiš, da container teče v ozadju: 
sudo docker compose up -d --build
4. Dostopaj do aplikacije znotraj brskalnika na lastnem IP naslovu in portu 3000
http://<tvoj_ip>:3000

Sam sem docker container zagnal na šolski virtualki z naslovom 212.101.137.107, kjer pe vedno teče, funkcionalnost pa je možno testirati preko http://212.101.137.107:3000/

API dokumentacija: 

1. GET /media
Opis: Vrne seznam vseh medijev (filmi in serije).

URL: /media
Metoda: GET
Primer odziva (200):
[
  {
    "id": 1,
    "title": "Inception",
    "type": "film",
    "rating": 9,
    "status": "completed"
  },
  ...
]

2. POST /media
Opis: Doda nov medij (film ali serijo).

URL: /media
Metoda: POST
Zahteva (JSON):
{
  "title": "1917",
  "type": "film",
  "rating": 6
}

Primer odziva (201):
{
  "id": 10,
  "title": "1917",
  "type": "film",
  "rating": 6,
  "status": "planned"
}


3. PUT /media/<id>
Opis: Posodobi obstoječo serijo oz. film (npr. spremeni status ali oceno).

URL: /media/<id>
Metoda: PUT
Zahteva (JSON):
{
  "status": "completed",
  "rating": 9
}

Primer odziva (200):
{
  "id": 10,
  "title": "1917",
  "type": "film",
  "rating": 9,
  "status": "completed"
}

4. DELETE /media/<id>
Opis: Izbriše izbran film oz. serijo.

URL: /media/<id>
Metoda: DELETE
Odziv (204): Brez vsebine



Možne vrednosti: 
type:
"film"
"series"

status:
"planned" (privzeto)
"watching"
"completed"

rating:
0-10
