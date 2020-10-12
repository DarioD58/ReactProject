CREATE TABLE KAMP
(
  vrijeme_odrzavanja DATE NOT NULL,
  trajanje_(dan/a) INT NOT NULL,
  pocetak_prijava_sudionika DATE NOT NULL,
  kraj_prijava_sudionika DATE NOT NULL,
  pocetak_prijava_animatora DATE NOT NULL,
  kraj_prijava_animatora DATE NOT NULL,
  broj_grupa INT NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  PRIMARY KEY (ime_kamp)
);

CREATE TABLE AKTIVNOST
(
  ime_aktivnost VARCHAR(100) NOT NULL,
  opis_aktivnost VARCHAR(500) NOT NULL,
  trajanje_aktivnost_(sat/i) INT NOT NULL,
  tip_aktivnost VARCHAR(20) NOT NULL,
  PRIMARY KEY (ime_aktivnost)
);

CREATE TABLE KORISNIK
(
  korisnicko_ime VARCHAR(50) NOT NULL,
  lozinka VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime),
  UNIQUE (email)
);

CREATE TABLE ORGANIZATOR
(
  korisnicko_ime_organizator VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_organizator),
  FOREIGN KEY (korisnicko_ime_organizator) REFERENCES KORISNIK(korisnicko_ime)
);

CREATE TABLE SUDIONIK
(
  br_tel_sudionik VARCHAR(20) NOT NULL,
  datum_i_god_rod_sudionik DATE NOT NULL,
  br_tel_odg_osobe VARCHAR(20) NOT NULL,
  motivacijsko_pismo_sudionik VARCHAR(3000) NOT NULL,
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_sudionik),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES KORISNIK(korisnicko_ime),
  UNIQUE (br_tel_sudionik)
);

CREATE TABLE ANIMATOR
(
  br_tel_animator VARCHAR(20) NOT NULL,
  datum_i_god_rod_animator DATE NOT NULL,
  motivacijsko_pismo_animator VARCHAR(3000) NOT NULL,
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_animator),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES KORISNIK(korisnicko_ime),
  UNIQUE (br_tel_animator)
);

CREATE TABLE PRIJAVA
(
  id_prijava INT NOT NULL,
  vrijeme_prijava DATE NOT NULL,
  status_prijava VARCHAR(20) NOT NULL,
  korisnicko_ime VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_prijava),
  FOREIGN KEY (korisnicko_ime) REFERENCES KORISNIK(korisnicko_ime)
);

CREATE TABLE GRUPA
(
  ime_grupa VARCHAR(50) NOT NULL,
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL,
  PRIMARY KEY (ime_grupa),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES SUDIONIK(korisnicko_ime_sudionik)
);

CREATE TABLE RASPORED
(
  datum_i_vrijeme_izvrsavanja TIMESTAMP(0) NOT NULL,
  ime_grupa VARCHAR(50) NOT NULL,
  ime_aktivnost VARCHAR(100) NOT NULL,
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  PRIMARY KEY (datum_i_vrijeme_izvrsavanja, ime_grupa, ime_aktivnost),
  FOREIGN KEY (ime_grupa) REFERENCES GRUPA(ime_grupa),
  FOREIGN KEY (ime_aktivnost) REFERENCES AKTIVNOST(ime_aktivnost),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES ANIMATOR(korisnicko_ime_animator)
);

CREATE TABLE animator_ocjena_aktivnosti
(
  ocjena_animator INT NOT NULL,
  dojam_animator VARCHAR(500) NOT NULL,
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  ime_aktivnost VARCHAR(100) NOT NULL,
  PRIMARY KEY (korisnicko_ime_animator, ime_aktivnost),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES ANIMATOR(korisnicko_ime_animator),
  FOREIGN KEY (ime_aktivnost) REFERENCES AKTIVNOST(ime_aktivnost)
);

CREATE TABLE sudionik_ocjena_aktivnosti
(
  ocjena_sudionik INT NOT NULL,
  dojam_sudionik VARCHAR(500) NOT NULL,
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL,
  ime_aktivnost VARCHAR(100) NOT NULL,
  PRIMARY KEY (korisnicko_ime_sudionik, ime_aktivnost),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES SUDIONIK(korisnicko_ime_sudionik),
  FOREIGN KEY (ime_aktivnost) REFERENCES AKTIVNOST(ime_aktivnost)
);