//dohvat pojedine grupe
function dohvat_grupe(ime_kamp){
  let str = 'SELECT * FROM GRUPA WHERE ime_grupa = ' + ime_kamp;
  return str;
}
//izmjena podataka grupe
function promjena_imena(staro_ime, novo_ime){
  let str = 'UPDATE GRUPA SET ime_grupa = ' + novo_ime + 'WHERE ime_grupa = ' + staro_ime;
  return str;
}
//izmjena grupe sudionika
function izmjena_grupe(stara_grupa, nova_grupa){
  let str = 'UPDATE SUDIONIK SET id_grupa = ' + podatak + 'WHERE korisnicko_ime_sudionik = ' + promjena;
  return str;
}
//dohvat svih grupa na trenutnom kampu
function dohvat_svih_grupa(){
  let str = 'SELECT * FROM GRUPA';
  return str;
}
//metoda za unos nove grupe
function unos_nove_grupe(ime_grupa){
  let str = 'INSERT INTO GRUPA (ime_grupa) VALUES(' + ime_grupa + ')';
  return str;
}
//metoda za unos novog statusa prijave
function unos_nove_prijave(korisnicko_ime, datum_i_vrijeme_prijava, datum_odrzavanja_kamp, ime_kamp, motivacijsko_pismo){
  let str = 'INSERT INTO PRIJAVA(korisnicko_ime, datum_i_vrijeme_prijava, datum_odrzavanja_kamp, ime_kamp, motivacijsko_pismo) VALUES(' + korisnicko_ime + ',' + datum_i_vrijeme_prijava + ',' + datum_odrzavanja_kamp + ',' + ime_kamp + ',' + motivacijsko_pismo + ')';
  return str;
}
//metoda za dohvat aktivnih prijava
function dohvat_aktivnih_prijava(){
  let str = 'SELECT * FROM PRIJAVA WHERE status_prijava = "aktivna"';
  return str;
}
//metoda za dohvat neobradenih prijava
function dohvat_neobradenih_prijava(){
  let str = 'SELECT * FROM PRIJAVA WHERE status_prijava = "neobradena"';
  return str;
}
//metoda za dohvat informacija o kampu
function dohvat_informacija_o_kampu(ime_kamp, datum_odrzavanja_kamp){
  let str = 'SELECT * FROM KAMP WHERE ime_kamp =' + ime_kamp + ' AND datum_odrzavanja_kamp =' + datum_odrzavanja_kamp;
  return str;
}
//metoda za unos novog statusa prijave u bazu
function unos_novog_statusa(id_prijava, status_prijava){
  let str = 'UPDATE PRIJAVA SET status_prijava = ' + status_prijava + 'WHERE id_prijava = ' + id_prijava;
  return str;
}
//metoda za unos nove aktivnosti
function unos_nove_aktivnosti(ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp){
  let str = 'INSERT INTO AKTIVNOST(ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp) VALUES(' + ime_aktivnost + ',' + opis_aktivnost + ',' + trajanje_aktivnost_h + ',' + tip_aktivnost + ',' + datum_odrzavanja_kamp + ',' + ime_kamp + ')';
  return str;
}
//metoda za brisanje kampa
function brisanje_kampa(ime_kamp){
  let str = 'DELETE * FROM KAMP WHERE ime_kamp = ' + ime_kamp;
  return str;
}
//metoda za unos novog kampa
function dodavanje_kampa(ime_kamp, datum_odrzavanja_kamp, email_kamp, trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa, status){
  let str = 'INSERT INTO KAMP(ime_kamp, datum_odrzavanja_kamp, email_kamp, trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa, status) VALUES(' + ime_kamp + ',' + datum_odrzavanja_kamp + ',' + email_kamp + ',' + trajanje_d + ',' + pocetak_prijava_sudionika + ',' + kraj_prijava_sudionika + ',' + pocetak_prijava_animatora + ',' + kraj_prijava_animatora + ',' + broj_grupa + ',' + status + ')';
  return str;
}
