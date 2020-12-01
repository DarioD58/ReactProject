const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kampAdmin',
    password: 'baze5842', //svatko svoju sifru za sebe
    port: 5432,
});
//kod za kreiranje baze kampova
const create_camps = `CREATE TABLE KAMP (
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
)`;
//kod za kreiranje aktivnosti
const create_activities = `CREATE TABLE AKTIVNOST (
  id_aktivnost SERIAL NOT NULL,
  ime_aktivnost VARCHAR(100) NOT NULL,
  opis_aktivnost VARCHAR(500) NOT NULL,
  trajanje_aktivnost_h INT NOT NULL,
  tip_aktivnost VARCHAR(20) NOT NULL,
  datum_odrzavanja_kamp DATE NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_aktivnost),
  FOREIGN KEY (datum_odrzavanja_kamp, ime_kamp) REFERENCES KAMP(datum_odrzavanja_kamp, ime_kamp)
)`;
//kod za kreiranje grupa
const create_groups = `CREATE TABLE GRUPA (
  ime_grupa VARCHAR(50) NOT NULL,
  id_grupa SERIAL,
  PRIMARY KEY (id_grupa)
)`;
//kod za kreiranje organizatora
const create_organizers = `CREATE TABLE ORGANIZATOR (
  korisnicko_ime_organizator VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnicko_ime_organizator),
  FOREIGN KEY (korisnicko_ime_organizator) REFERENCES KORISNIK(korisnicko_ime)
);`
//kod za kreiranje sudionika
const create_participators = `CREATE TABLE SUDIONIK
(
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL,
  datum_i_god_rod_sudionik DATE NOT NULL,
  br_tel_sudionik VARCHAR(20) NOT NULL,
  motivacijsko_pismo_sudionik VARCHAR(3000) NOT NULL,
  br_tel_odg_osobe VARCHAR(20) NOT NULL,
  id_grupa INT,
  PRIMARY KEY (korisnicko_ime_sudionik),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES KORISNIK(korisnicko_ime),
  FOREIGN KEY (id_grupa) REFERENCES GRUPA(id_grupa),
  UNIQUE (br_tel_sudionik)
)`;
//kod za kreiranje animatora
const create_animators = `CREATE TABLE ANIMATOR (
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  datum_i_god_rod_animator DATE NOT NULL,
  br_tel_animator VARCHAR(20) NOT NULL,
  motivacijsko_pismo_animator VARCHAR(3000) NOT NULL,
  PRIMARY KEY (korisnicko_ime_animator),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES KORISNIK(korisnicko_ime),
  UNIQUE (br_tel_animator)
)`;
//kod za kreiranje prijava
const create_entries = `CREATE TABLE PRIJAVA (
  id_prijava SERIAL NOT NULL,
  korisnicko_ime VARCHAR(50) NOT NULL,
  datum_i_vrijeme_prijava TIMESTAMP(0) NOT NULL,
  status_prijava VARCHAR(20),
  datum_odrzavanja_kamp DATE NOT NULL,
  ime_kamp VARCHAR(50) NOT NULL,
  motivacijsko_pismo VARCHAR(3000) NOT NULL,
  PRIMARY KEY (id_prijava),
  FOREIGN KEY (korisnicko_ime) REFERENCES KORISNIK(korisnicko_ime),
  FOREIGN KEY (datum_odrzavanja_kamp, ime_kamp) REFERENCES KAMP(datum_odrzavanja_kamp, ime_kamp)
)`;
//kod za kreiranje rasporeda
const create_schedules = `CREATE TABLE RASPORED (
  datum_i_vrijeme_izvrsavanja TIMESTAMP(0) NOT NULL,
  id_aktivnost INT NOT NULL,
  id_grupa INT NOT NULL,
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  PRIMARY KEY (datum_i_vrijeme_izvrsavanja, id_aktivnost, id_grupa),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES ANIMATOR(korisnicko_ime_animator),
  FOREIGN KEY (id_aktivnost) REFERENCES AKTIVNOST(id_aktivnost),
  FOREIGN KEY (id_grupa) REFERENCES GRUPA(id_grupa)
)`;
//kod za kreiranje sjednica
const create_sessions = `CREATE TABLE SESSION (
    sid VARCHAR NOT NULL,
    sess JSON NOT NULL,
    expire TIMESTAMPTZ(6) NOT NULL
  )
  WITH (OIDS=FALSE)`;
const create_animator_ocjena_aktivnosti = `CREATE TABLE animator_ocjena_aktivnosti (
  korisnicko_ime_animator VARCHAR(50) NOT NULL,
  id_aktivnost INT NOT NULL,
  ocjena_animator INT NOT NULL,
  dojam_animator VARCHAR(500) NOT NULL,
  PRIMARY KEY (korisnicko_ime_animator),
  FOREIGN KEY (korisnicko_ime_animator) REFERENCES ANIMATOR(korisnicko_ime_animator),
  FOREIGN KEY (id_aktivnost) REFERENCES AKTIVNOST(id_aktivnost)
)`;
const  create_sudionik_ocjena_aktivnosti = `CREATE TABLE sudionik_ocjena_aktivnosti (
  korisnicko_ime_sudionik VARCHAR(50) NOT NULL,
  id_aktivnost INT NOT NULL,
  ocjena_sudionik INT NOT NULL,
  dojam_sudionik VARCHAR(500) NOT NULL,
  PRIMARY KEY (korisnicko_ime_sudionik),
  FOREIGN KEY (korisnicko_ime_sudionik) REFERENCES SUDIONIK(korisnicko_ime_sudionik),
  FOREIGN KEY (id_aktivnost) REFERENCES AKTIVNOST(id_aktivnost)
)`;
//kod za kreiranje i popunjavanje baze korisnika
const create_users = `CREATE TABLE KORISNIK (
  korisnicko_ime VARCHAR(50) NOT NULL,
  lozinka VARCHAR(50),
  email VARCHAR(50) NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  status VARCHAR(50),
  PRIMARY KEY (korisnicko_ime),
  UNIQUE (email)
)`;

const insert_activities = `INSERT INTO "AKTIVNOST" (id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost) VALUES
('1', 'Dorucak', 'Dorucak za samoposluznim stolom', '1'),
('2', 'Rucak', 'Rucak za samoposluznim stolom', '1'),
('3', 'Vecera', 'Vecera bez samoposluznog stola', '1'),
('4', 'Tjelovjezba', 'Razgibavanje za zdravo tijelo', '0.5'),
('5', 'Boks', 'Razvoj kompetitivnog duha', '1'),
('6', 'Programiranje na 100 metara', 'Ispisivanje SQL upita u jednom redu', '1.5'),
('7', 'Zbor', 'Iskaljivanje frustracija', '1'),
('8', 'Kulinarstvo', 'Prehranjivanje gladnih programera', '1.5'),
('9', 'Gradanski Odgoj', 'Ucenje o programerskoj etici', '2'),
('10', 'C# u vis', 'Najdulja klasa pobjeduje', '2'),
('11', 'Razbijanje tipkovnice', 'Na kraju dana, svi smo mi isti', '2')`
