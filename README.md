Aplikacija omogoča sledenje filmov in serij, ki si jih uporabnik želi pogledati, jih gleda oz. si jih je ogledal v preteklosti. Uporabnik lahko na seznam doda poljuben film ali serijo, doda njegovo oceno (ali pusti prazno polje in oceno doda kasneje) ter izbere med tipom vsebine (serija in film). S klikom na gumb "Dodaj" se film/serija doda v ustrezno tabelo filmov oz. serij in prikaže pod vnosnimi polji. Znotraj tabele lahko uporabnik spreminja status filma in sicer na "completed", "watching" ali "planed". Lahko tudi dodaja oz. spreminja oceno in izbriše posamezen film oz. serijo. 

Navodila za zagon:
1. Kloniranje repozitorija 
git clone https://github.com/maticmerela/MovieTracker.git
2. Postavi se v root mapo projekta. 
3. Zgradi docker image: 
sudo docker compose up --build
4. Dostopaj do aplikacije znotraj brskalnika na lastnem IP naslovu in portu 3000
http://<tvoj_ip>:3000


Sam sem docker container zagnal na šolski virtualki in (bi moral) še vedno biti dostopen preko naslednje povezave: http://212.101.137.107:3000/