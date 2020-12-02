const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kampAdmin',
    password: 'bazepodataka', //svatko svoju sifru za sebe
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

const insert_camps = `INSERT INTO KAMP (ime_kamp, datum_odrzavanja_kamp, trajanje, pocetak_prijava_sudionika, kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa) VALUES
('Mlade Nade Slavonije', '2020-12-01', '21', '2020-11-01', '2020-11-15', '2020-10-01', '2020-11-15', '20'),
('Programerske Glave', '2021-01-14', '14', '2020-12-31', '2021-01-07', '2020-11-15', '2021-01-13', '15'),
('Mali FER-ovci', '2021-03-15', '7', '2020-11-30', '2021-02-01', '2020-10-10', '2021-02-01', '50')`;

const insert_users = `INSERT INTO KORISNIK (korisnicko_ime,lozinka,email,ime,prezime,status) VALUES
('Carlos Carey','BSR06JBP0LT','non.cursus@odiotristiquepharetra.edu','Virginia','Sears','K'),
('Rhiannon Austin','ZHK48AVM1JF','Pellentesque@orciquislectus.edu','Phoebe','Knight','K'),
('Jenette Jimenez','VFJ33HSM8DI','Cras.lorem@adipiscingelitEtiam.edu','Unity','Goff','K'),
('Kennedy Frazier','JAS97BZC8KB','amet@dictum.ca','Kennan','Tyler','K'),
('Nathaniel Guy','YAX40YKF7IF','sociis.natoque@cubilia.com','Ria','Meyer','K'),
('Timothy Boyd','MBC98NID3AQ','id.enim.Curabitur@quam.edu','Willa','Rios','K'),
('Beverly Hurley','KWK27PGL1EQ','luctus.ipsum.leo@nisiaodio.com','Brian','Elliott','K'),
('Shaeleigh Yates','CQB54AWB2OF','urna@euenim.edu','Moses','Richard','K,'),
('Rana Morrow','PMS71LMJ4QX','dui@Fuscemi.edu','Palmer','Hunt','K'),
('Xena Pena','BNZ21RHZ5XR','ante@indolor.com','Ocean','Tillman','K'),
('Harper Todd','NHT06PKQ9MO','pretium.aliquet.metus@incursus.net','Amir','Harrington','K'),
('Kiara Tillman','BNP19MOA4PI','interdum.libero@et.com','Dexter','Boone','K'),
('Lydia Eaton','PYJ19UJX8GF','eu.odio.tristique@eleifendnunc.net','Daquan','Austin','K'),
('Regan Ingram','ZGE29MIO9OM','est.Nunc@vehiculaPellentesque.edu','Keane','Gallegos','K'),
('Francis Mendez','IDM50RKE8EW','dolor@ante.co.uk','Karyn','Fitzgerald','K'),
('Aristotle Huff','TQM69HNO6PF','imperdiet.nec.leo@velitdui.com','Tad','Johns','K'),
('Graham Figueroa','BWN18BQK5RP','eu.nibh.vulputate@Nuncmauris.com','Willa','Wiggins','K'),
('Katell Alford','MAL53ZFZ8QW','ac@Etiamlaoreet.co.uk','Sandra','Le','K'),
('Cadman Stevens','LFA61HFO7QT','non@ornareelitelit.edu','Calista','Buck','K'),
('Blake Duncan','XIU87ANK2QZ','gravida.Praesent.eu@ipsum.edu','Liberty','Curry','K'),
('Holmes Sweeney','RJD10BDA6ZB','lacus.Quisque.purus@sagittissemperNam.com','Tanisha','Coffey','K'),
('Imani Lowe','HEU67KLA3JH','interdum.libero.dui@Aliquamauctorvelit.edu','Lacey','Macdonald','K'),
('Tucker Melton','DZZ34BAX5WT','nunc.interdum.feugiat@volutpatNullafacilisis.com','Anastasia','Bridges','K'),
('Patience Gibson','IZX60NWS0PU','Duis.elementum@et.com','Fleur','Luna','K'),
('Dana Mitchell','DYK26HTT6OM','Morbi.non@sit.co.uk','Maite','Mccormick','K'),
('Ethan Terrell','MYM89PJE5SS','vestibulum.neque@felis.net','Ulla','Blanchard','K'),
('Anika Cooper','ZWK47FBL1RQ','habitant@malesuada.edu','Macey','Evans','K'),
('Ethan Reyes','ALV35YNQ1XZ','diam@Inornare.net','Orlando','Mcknight','K'),
('Sigourney Watts','NEL48DIY9GB','Phasellus.at.augue@aliquam.ca','Jesse','Maddox','K'),
('Raphael Bradford','AJY25QRE7EN','eu@dolorDonecfringilla.ca','Victoria','Moore','K'),
('Samantha Medina','EYX62YGC0HY','enim.Mauris@sapienimperdiet.net','Iliana','Massey','K'),
('Shannon Palmer','XOH96ZIX1DI','felis.orci.adipiscing@aliquamerosturpis.org','Yetta','Sullivan','K'),
('Ezra Holland','TKQ18UWF0OT','odio@nequepellentesque.co.uk','Cassidy','Hess','K'),
('Natalie Crawford','NOF83YGV5ON','vel.convallis.in@Duisdignissim.co.uk','Pamela','Potts','K'),
('Illana Sawyer','GJH00FUF7ZC','ante.dictum.cursus@tellusSuspendisse.net','Irma','Snow','K'),
('Ebony Tillman','IFM50NKP7OO','Nunc.mauris@Morbi.ca','Vance','Roth','K'),
('Matthew Townsend','WIX52SRV4NY','metus.Aenean@at.co.uk','Keelie','Nunez','K'),
('Octavia Figueroa','KNJ62IXX2NC','velit.in.aliquet@lobortis.com','Zeus','Carrillo','K'),
('Maia Haney','MIZ74YWK6EU','commodo.at@variusNamporttitor.net','Chadwick','Sellers','K'),
('Miriam Arnold','RRW96KBX3QH','vulputate.lacus.Cras@leoelementum.org','Patience','Reilly','K'),
('Charlotte Hendricks','BMQ92LHO1AD','nibh.dolor@risusquisdiam.org','Bethany','Williams','K'),
('Fatima Bryant','AUI91ZNT3VJ','tempus.non.lacinia@infelis.edu','Joshua','Herrera','K'),
('Uriah Kane','IVE07BDJ6CA','vulputate.dui.nec@rhoncusidmollis.ca','Dorothy','Mendoza','K'),
('Cara Herrera','XEH18FJY9YD','rhoncus.id.mollis@Nam.org','Zephr','Hewitt','K'),
('Belle Logan','HXS21JGP6QG','litora.torquent.per@mattisvelitjusto.org','Levi','Moon','K'),
('Hiroko Jimenez','DRU94GIG6ZQ','nec.tempus@NulladignissimMaecenas.co.uk','Callum','Underwood','K'),
('Isadora Morgan','LXG75JRG9AD','tristique@nondapibusrutrum.ca','Jarrod','Ferrell','K'),
('Mona Stephens','GPZ75WOH0CB','Pellentesque.habitant@incursus.co.uk','Molly','Washington','K'),
('Clark David','VKO22OPU6VF','lorem.auctor@euismodacfermentum.edu','Boris','Santana','K'),
('Sara Mills','UNQ42FYD3VE','eget.massa@ipsum.co.uk','Guinevere','Small','K'),
('Hedwig Jarvis','IKG85BEE5UC','sit.amet@sem.ca','Elliott','Ingram','K'),
('Samson Wilcox','OCM00IRW7EE','pede.nonummy@parturient.net','Chadwick','Moss','K'),
('Asher Burks','FGV24EUA5BP','sem.molestie.sodales@cubiliaCuraePhasellus.edu','Dale','Dean','K'),
('Orson Hendricks','JJX89BFN0SR','id@semperdui.co.uk','Raya','Lindsay','K'),
('Hiroko Leonard','BPU25PWB9OR','Vestibulum.ante.ipsum@ametmetus.co.uk','Rama','Richardson','K'),
('Brady Booker','PWJ77GSP1JZ','iaculis.quis@liberoProinmi.ca','Deirdre','Mclaughlin','K.'),
('Chastity Moran','LID95CTR4LD','massa@ullamcorperDuis.co.uk','Desiree','Lewis','K'),
('Rachel Manning','JZO99PDW9SV','quis@et.ca','Gregory','Briggs','K'),
('Dustin Hyde','KAX18XQZ8IT','non.arcu@Donec.net','Kasper','Workman','K'),
('Quinn Lindsey','HPD33HEZ7PV','adipiscing.lacus@mollis.co.uk','Adena','Mejia','K'),
('Wyoming Colon','PSU10NWP5FP','nascetur.ridiculus.mus@blanditenim.com','Ina','Kemp','K'),
('Elvis Schneider','IYD64YYK0KN','est.Nunc@Donecelementum.co.uk','Megan','Shannon','K'),
('Zeph Glass','ZZC73KIN6NK','facilisis.facilisis@malesuadamalesuada.com','Neve','Galloway','K'),
('Aubrey Kirby','RGJ96TUL4YA','nascetur@Donec.co.uk','Jolene','Wood','K'),
('Cassidy Harmon','AYT85CPB5SD','ipsum@Etiamvestibulummassa.co.uk','Shafira','Joseph','K'),
('Zahir Kramer','CFE13RGL0KW','egestas.Aliquam.fringilla@luctus.edu','Chadwick','Ratliff','K'),
('Desiree Brown','IBZ86DDK9RA','semper.auctor@auctor.org','Len','Summers','K'),
('Ezekiel Lamb','WAQ50ZFY0UY','diam.luctus@porttitoreros.ca','Finn','Wilcox','K'),
('Martha Pugh','VBI65ZHF7VN','iaculis@sed.co.uk','Jael','Banks','K'),
('Hoyt Flynn','XCR31WWK8RS','elit@tincidunt.com','Joel','Knapp','K'),
('Nola Kim','MAO34HEY6IX','id@semutdolor.edu','Amethyst','Sheppard','K'),
('Cassidy Brock','IBZ52JTP3TE','Cum@Aliquamnecenim.org','Hayden','Cooke','K'),
('Vladimir Underwood','OES71AFZ8WP','lacinia@egestashendrerit.com','Dylan','Chang','K'),
('Calvin Bullock','NAZ82ZUW8ND','lacus@cursus.edu','Jolie','Trujillo','K'),
('Brianna Bright','ECV80FIF5SU','dui.Suspendisse@Duis.edu','Lev','Rush','K'),
('Leslie Wilcox','UIL22RDW6AI','metus.In@Maecenasmifelis.org','Ivor','Sparks','K'),
('Joy Barlow','BFJ97RMO2JG','elementum.lorem@elitCurabitur.co.uk','Dakota','Haley','K'),
('Halla Weaver','KGT08GTC9CE','auctor@orci.edu','Declan','Tyson','K'),
('Justina Fuentes','CCQ37XFT8GJ','et@magna.co.uk','Shad','Mcleod','K'),
('Roth Fuller','ZSB17JLL2WH','amet.faucibus@massaSuspendisse.com','Abigail','Carson','K'),
('Melyssa Alford','CAF05DYP2GG','nulla.magna.malesuada@Nulla.com','Zenaida','Russo','K'),
('Josiah Burton','RUK50UEP0EZ','Nullam@placeratvelit.com','Suki','Snider','A'),
('Vivien Weaver','LCD64FAS6PU','Curabitur@vitaeorciPhasellus.co.uk','Dai','Obrien','A'),
('Nicole Mckay','SSX47VGX8SR','montes@sagittisfelis.org','James','Sheppard','A'),
('Kitra Mays','YUP47WHO7QO','quis.diam.Pellentesque@lorem.net','Maxwell','Holder','A'),
('McKenzie Boyd','TWF42NZW0WW','commodo.at@dictumcursusNunc.co.uk','Shaeleigh','Henderson','A'),
('Ignacia Horton','JQD49ZWN6YV','magna.Duis@urna.net','Dane','Vasquez','A'),
('Chester Avery','XQQ83ATF3JU','amet@lacinia.ca','Liberty','Smith','A'),
('Kato Glass','YTZ75TXX9WQ','Proin.ultrices.Duis@pedeCras.ca','Harlan','Barnett','A,'),
('Galvin Navarro','MSD32FJR2VG','egestas.rhoncus@ac.net','Genevieve','Peters','A'),
('Griffith Savage','CNO28QCT3SB','consequat.dolor.vitae@SuspendisseeleifendCras.edu','Robin','Odom','A'),
('Kelsey Kaufman','KQV30YYM1IM','at@felis.com','Randall','Heath','A'),
('Arsenio Fowler','QYJ99CJP6SP','metus.vitae@etmagnis.com','Olga','Fisher','A'),
('Gwendolyn Rojas','HMM88SWV5KQ','tristique@Phasellus.org','Phyllis','Callahan','A'),
('Aaron Dawson','QQP29TVW9LN','lorem@vestibulumnequesed.com','Hedwig','Logan','A,'),
('Phoebe Cox','DLD56VLA7KR','nec@euismod.co.uk','Dakota','Wilkerson','O'),
('Abbot Vincent','SHA59PZR5CQ','ultrices@etultrices.co.uk','Maggy','Floyd','O'),
('Hu Osborn','XTZ40TVY0QN','mauris.sit.amet@tinciduntDonec.co.uk','Paloma','Lynch','O'),
('Lewis Horn','OUB59XGV2IG','nunc.ac.mattis@nequenon.co.uk','Lee','Frye','O'),
('Cally Lane','DMY32CXP3BL','diam.Proin@ametmassaQuisque.com','Tana','Banks','O')`;

const insert_activities = `INSERT INTO AKTIVNOST (id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp) VALUES
('1', 'Dorucak', 'Dorucak za samoposluznim stolom', '1', 'Jelo', '2020-01-01', 'Mali FER-ovci'),
('2', 'Rucak', 'Rucak za samoposluznim stolom', '1','Jelo', '2020-01-01', 'Mali FER-ovci'),
('3', 'Vecera', 'Vecera bez samoposluznog stola', '1','Jelo', '2020-01-01', 'Mali FER-ovci'),
('4', 'Tjelovjezba', 'Razgibavanje za zdravo tijelo', '0.5' 'Vjezba', '2020-10-10', 'Programerske Glave'),
('5', 'Boks', 'Razvoj kompetitivnog duha', '1', 'Vjezba', '2020-10-10', 'Programerske Glave'),
('6', 'Programiranje na 100 metara', 'Ispisivanje SQL upita u jednom redu', '1.5', 'Vjezba', '2020-11-05', 'Programerske Glave'),
('7', 'Zbor', 'Iskaljivanje frustracija', '1', 'Vjezba', '2021-11-01', 'Programerske Glave'),
('8', 'Kulinarstvo', 'Prehranjivanje gladnih programera', '1.5', 'Kuhanje', '2021-11-10', 'Mlade Nade Slavonije'),
('9', 'Gradanski Odgoj', 'Ucenje o programerskoj etici', '2', 'Ucenje', '2019-12-10', 'Mlade Nade Slavonije'),
('10', 'C# u vis', 'Najdulja klasa pobjeduje', '2', 'Ucenje', '2021-12-10', 'Mlade Nade Slavonije'),
('11', 'Razbijanje tipkovnice', 'Na kraju dana, svi smo mi isti', '2', 'Ucenje', '2021-06-12', 'Mlade Nade Slavonije')`;

const insert_applications = `INSERT INTO PRIJAVA (id_prijava, korisnicko_ime, datum_i_vrijeme_prijava, status_prijava) VALUES
('1', 'Carlos Carey', '2020-12-23', 'poslana'),
('2', 'Halla Weaver', '2021-02-11', 'poslana'),
('3', 'Rachel Manning', '2020-11-30', 'prihvacena'),
('4', 'Quinn Lindsey', '2021-01-13', 'odbijena'),
('5', 'Charlotte Hendricks', '2021-02-24', 'odbijena')`;

const insert_groups = `INSERT INTO GRUPA (ime_grupa, id_grupa) VALUES
('Banditosi', '1'),
('FER Gang', '2'),
('Cassandra Najbolja', '3'),
('Ce Sarp', '4'),
('Yeet', '5'),
('Jarun', '6'),
('110 Posto', '7'),
('Tehnicari', '8'),
('Vodovodna Jedinica', '9'),
('Progi Projekt', '10')`;

const insert_schedule = `INSERT INTO RASPORED (datum_i_vrijeme_izvrsavanja, id_aktivnost, id_grupa, korisnicko_ime_animator) VALUES
('2020-12-01T13:00:00+00:00','2','8','Vivien Weaver'),
('2021-01-08T12:00:00+00:00','5','5','Kato Glass'),
('2021-02-17T13:00:00+00:00','4','4','Gwendolyn Rojas'),
('2021-01-06T18:00:00+00:00','2','4','Aaron Dawson'),
('2021-03-02T15:00:00+00:00','1','3','Kato Glass'),
('2020-10-13T18:00:00+00:00','8','1','Vivien Weaver'),
('2020-12-05T15:00:00+00:00','7','9','Vivien Weaver'),
('2021-01-11T15:00:00+00:00','4','10','Kelsey Kaufman'),
('2021-01-19T09:00:00+00:00','2','5','Arsenio Fowler'),
('2021-02-06T17:00:00+00:00','10','1','Aaron Dawson'),
('2021-03-14T17:00:00+00:00','4','8','Josiah Burton')`;

const insert_animator_ocjena_aktivnosti = `INSERT INTO animator_ocjena_aktivnosti (korisnicko_ime_animator, id_aktivnost, ocjena_animator, dojam_animator) VALUES
('Josiah Burton', '3', '5', 'Skroz solidna organizacija'),
('Vivien Weaver', '7', '2', 'Skoro sam umro'),
('Aaron Dawson', '9', '4', 'Nedovoljno soli za moj ukus'),
('Aaron Dawson', '3', '5', 'Bilo nam je genijalno'),
('Kelsey Kaufman', '6', '1', 'Bilo nam je suprotno od genijalnog')`;

const insert_sudionik_ocjena_aktivnosti =  `INSERT INTO sudionik_ocjena_aktivnosti (korisnicko_ime_sudionik, id_aktivnost, ocjena_sudionik, dojam_sudionik) VALUES
('Hedwig Jarvis', '4', '3', 'Imam osjecaj da me animator ne voli'),
('Rachel Manning', '1', '1', 'Uspio sam si zapaliti prste'),
('Ezra Holland', '4', '5', 'Predobro, s obzirom da nemam pojma sto se dogada'),
('Rhiannon Austin', '6', '5', 'Bilo nam je genijalno'),
('Rhiannon Austin', '7', '1', 'Bilo nam je suprotno od genijalnog')`;
