CREATE DATABASE kampAdmin;
SET DATESTYLE TO German;
SET TIME ZONE LOCAL;

CREATE TABLE KAMP
(
  ime_kamp VARCHAR(50) NOT NULL,
  datum_odrzavanja_kamp TIMESTAMPTZ(0) NOT NULL,
  email_kamp VARCHAR(50),
  trajanje_d INT NOT NULL,
  pocetak_prijava_sudionika DATE NOT NULL,
  kraj_prijava_sudionika DATE NOT NULL,
  pocetak_prijava_animatora DATE NOT NULL,
  kraj_prijava_animatora DATE NOT NULL,
  broj_grupa INT,
  status SMALLINT,
  PRIMARY KEY (datum_odrzavanja_kamp, ime_kamp)
);

CREATE TABLE AKTIVNOST
(
  id_aktivnost SERIAL NOT NULL,
  ime_aktivnost VARCHAR(100) NOT NULL,
  opis_aktivnost VARCHAR(500) NOT NULL,
  trajanje_aktivnost_h INT NOT NULL,
  tip_aktivnost VARCHAR(20) NOT NULL,
  datum_odrzavanja_kamp TIMESTAMPTZ(0) NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_aktivnost),
  FOREIGN KEY (datum_odrzavanja_kamp, ime_kamp) REFERENCES KAMP(datum_odrzavanja_kamp, ime_kamp) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE GRUPA
(
  ime_grupa VARCHAR(50) NOT NULL,
  id_grupa SERIAL,
  PRIMARY KEY (id_grupa)
);

CREATE TABLE KORISNIK
(
  korisnicko_ime VARCHAR(50) NOT NULL,
  lozinka VARCHAR(50),
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  datum_i_god_rod DATE NOT NULL,
  email VARCHAR(50) NOT NULL,
  br_tel VARCHAR(20) NOT NULL,
  status VARCHAR(20),
  PRIMARY KEY (korisnicko_ime)
);

CREATE TABLE ORGANIZATOR
(
  korisnicko_ime_organizator VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_organizator),
  FOREIGN KEY (korisnicko_ime_organizator) REFERENCES KORISNIK(korisnicko_ime) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE SUDIONIK
(
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL ,
  br_tel_odg_osobe VARCHAR(20),
  id_grupa INT,
  PRIMARY KEY (korisnicko_ime_sudionik),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES KORISNIK(korisnicko_ime) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_grupa) REFERENCES GRUPA(id_grupa) ON UPDATE CASCADE
);

CREATE TABLE ANIMATOR
(
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_animator),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES KORISNIK(korisnicko_ime) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PRIJAVA (
  id_prijava SERIAL NOT NULL,
  status_prijava VARCHAR(20),
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  datum_i_god_rod DATE NOT NULL,
  email VARCHAR(50) NOT NULL,
  br_tel VARCHAR(20) NOT NULL,
  br_tel_odg_osobe VARCHAR(20),
  motivacijsko_pismo VARCHAR(3000) NOT NULL,
  status_korisnik VARCHAR(50) NOT NULL, 
  datum_i_vrijeme_prijava TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  datum_odrzavanja_kamp DATE NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_prijava),
  FOREIGN KEY (datum_odrzavanja_kamp, ime_kamp) REFERENCES KAMP(datum_odrzavanja_kamp, ime_kamp) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE RASPORED
(
  datum_i_vrijeme_izvrsavanja TIMESTAMPTZ(0) NOT NULL,
  id_aktivnost INT NOT NULL,
  id_grupa INT,
  korisnicko_ime_animator VARCHAR(50),
  PRIMARY KEY (datum_i_vrijeme_izvrsavanja, id_aktivnost, id_grupa),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES ANIMATOR(korisnicko_ime_animator) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_aktivnost) REFERENCES AKTIVNOST(id_aktivnost) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_grupa) REFERENCES GRUPA(id_grupa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ocjena_aktivnost
(
  ocjena INT NOT NULL,
  dojam VARCHAR(500) NOT NULL,
  id_aktivnost INT NOT NULL,
  korisnicko_ime VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_aktivnost, korisnicko_ime),
  FOREIGN KEY (id_aktivnost) REFERENCES AKTIVNOST(id_aktivnost) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (korisnicko_ime) REFERENCES KORISNIK(korisnicko_ime) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ukupni_dojam
(
  ocjena INT NOT NULL,
  dojam VARCHAR(500) NOT NULL,
  korisnicko_ime VARCHAR(50) NOT NULL,
  datum_odrzavanja_kamp DATE NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime, datum_odrzavanja_kamp, ime_kamp),
  FOREIGN KEY (korisnicko_ime) REFERENCES KORISNIK(korisnicko_ime) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (datum_odrzavanja_kamp, ime_kamp) REFERENCES KAMP(datum_odrzavanja_kamp, ime_kamp) ON DELETE CASCADE ON UPDATE CASCADE
);
