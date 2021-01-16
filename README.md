Projekt iz predmeta Programsko Inženjerstvo na FER-u.

Web-aplikacija za upravljanje, pridruživanje i sudjelovanje na kampu računarstva.

Link aplikacije:
https://progi-kamp-mlade-nade.herokuapp.com/

Podaci za prijavu glavnog organizatora:
korisnicko ime: KampMladeNade
lozinka: ProgiProjektMladeNade

Upozorenje: 
Funckionalnost slanja email obavijesti kod prihvaćanja i odbijanja prijave radila je na lokalnoj aplikaciji.
Nakon postavljanja aplikacije na Heroku, naš server ne uspijeva poslati email te vraća grešku Service Unavailable.
Nakon iscrpnog testiranja nismo uspjeli omogućiti tu funkcionalnost, zato je kod prihvaćanja i odbijanja prijava potrebno
osvježiti stranicu kako bi obrađene prijave nestale. 
Backend funkcionalnosti vezane za prijave funkcioniraju bez obzira na nemogućnost slanja email obavijesti.

U mailu se šalje sljedeći link za dovršetak prijave: 
https://progi-kamp-mlade-nade.herokuapp.com/register

Radi lakšeg testiranja najbolje je spojiti se na bazu podataka preko pgAdmin,
kako bi se u bazi izmijenili podaci o kampu zbog vremenskih ograničenja aplikacije.
Potrebno je stvoriti novi server u pgAdminu.

Za stvaranje novog servera, najjednostavnije je pogledati na ovom link kako se to radi:
https://medium.com/analytics-vidhya/how-to-use-pgadmin-to-connect-to-a-heroku-database-c69b7cbfccd8

Ukratko, potrebno je stvoriti novi server i filtrirati našu bazu podataka (bez toga se zbog Herokua prikazuju i neke druge baze).

Potrebni podaci baze koje generira Heroku navedeni su ispod.
Host: ec2-54-78-127-245.eu-west-1.compute.amazonaws.com
Database: d7o5kmr00s49tn
User: btjjgaufdoghnw
Port: 5432
Password: e5cdfe71231ab7bc350a46106b1de991b12a3676cb77d0da8d802f142b48c92c
URI: postgres://btjjgaufdoghnw:e5cdfe71231ab7bc350a46106b1de991b12a3676cb77d0da8d802f142b48c92c@ec2-54-78-127-245.eu-west-1.compute.amazonaws.com:5432/d7o5kmr00s49tn
Heroku CLI: heroku pg:psql postgresql-rigid-05748 --app progi-kamp-mlade-nade

Informacije za testiranje:
Dodani su kamp, sudionici i animatori.
Sudionike je potrebno rasporediti u grupe.
Aktivnosti postoje te ih je potrebno dodati u raspored.
Za testiranje vremenskih ograničenja preporučamo:
    - izmjenene datuma početka i kraja prijava za sudionike i animatore - pregled stranice kada su prijave otvorene i zatvorene
    - izmjene datuma početka kampa - za pregled stranice prije početka kampa, tijekom trajanja kampa te nakon kampa; za otvaranje mogućnosti       ocjenjivanja kampa
    - postavljanje datuma izvršavanja aktivnosti u rasporedu na datum koji je prošao kako bi se korisniku otvorila mogućnost ocjene obavljene aktivnosti
