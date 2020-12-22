//dohvat pojedine grupe
function dohvat_grupe(ime_kamp){
  let str = 'SELECT * FROM GRUPA WHERE ime_grupa = ' + ime_kamp;
}
//izmjena podataka grupe
function promjena_imena(staro_ime, novo_ime){
  let str = 'UPDATE GRUPA SET ime_grupa = ' + novo_ime + 'WHERE ime_grupa = ' + staro_ime;
}
//izmjena grupe sudionika
function izmjena_grupe(stara_grupa, nova_grupa){
  let str = 'UPDATE SUDIONIK SET id_grupa = ' + podatak + 'WHERE korisnicko_ime_sudionik = ' + promjena;
}
//dohvat svih grupa na trenutnom kampu
function dohvat_svih_grupa(){
  let str = 'SELECT * FROM GRUPA';
}
//metoda za unos nove grupe
function unos_nove_grupe(ime_grupa){
  let str = 'INSERT INTO GRUPA (ime_grupa) VALUES(' + ime_grupa + ')';
}
//metoda za unos novog statusa prijave
function unos_nove_prijave(korisnicko_ime, datum_i_vrijeme_prijava, datum_odrzavanja_kamp, ime_kamp, motivacijsko_pismo){
  let str = 'INSERT INTO PRIJAVA(korisnicko_ime, datum_i_vrijeme_prijava, datum_odrzavanja_kamp, ime_kamp, motivacijsko_pismo) VALUES(' + korisnicko_ime + ',' + datum_i_vrijeme_prijava + ',' + datum_odrzavanja_kamp + ',' + ime_kamp + ',' + motivacijsko_pismo + ')';
}
//metoda za dohvat aktivnih prijava
function dohvat_aktivnih_prijava(){
  let str = 'SELECT * FROM PRIJAVA WHERE status_prijava = "aktivna"';
}
//metoda za dohvat neobradenih prijava
function dohvat_neobradenih_prijava(){
  let str = 'SELECT * FROM PRIJAVA WHERE status_prijava = "neobradena"';
}
//metoda za dohvat informacija o kampu
function dohvat_informacija_o_kampu(ime_kamp, datum_odrzavanja_kamp){
  let str = 'SELECT * FROM KAMP WHERE ime_kamp =' + ime_kamp + ' AND datum_odrzavanja_kamp =' + datum_odrzavanja_kamp;
}
