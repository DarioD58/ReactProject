const db = require('../db');
const Sudionik = require('../models/Sudionik');
const Korisnik = require('../models/Korisnik');

module.exports = class Grupa {
    //konstruktor
    constructor(ime_grupa){
        this.id_grupa = undefined;   // number
        this.ime_grupa = ime_grupa;   // string
    }

    // implementacija generičkih funkcionalnost za dohvat, uređivanje, brisanje...

    // dohvaća sve grupe
    static async fetchAllGrupa(){
        let results = await dbGetAllGrupa();
        let grupe = [];
        let grupa;

        if (results.length > 0){
          for(let i = 0; i < results.length; i++){
            grupa = new Grupa(results[i].ime_grupa);
            grupa.id_grupa = results[i].id_grupa;
            grupe.push(grupa);
          }
        }
        return grupe;
    }

    static async fetchGrupaById(id_grupa){
      let results = await dbGetGrupaById(id_grupa);
      let grupa;

      if (results.length > 0){
          grupa = new Grupa(results[i].ime_grupa);
          grupa.id_grupa = results[i].id_grupa;
      }
      return grupa;
  }


    //dohvat svih grupa na trenutnom kampu
    static async fetchAllGrupaSKampa(datum_odrzavanja_kamp, ime_kamp){
      let results = await dbFetchAllGrupaSKampa(datum_odrzavanja_kamp, ime_kamp);
      let grupe = [];
      let grupa;

      if (results.length > 0){
        for(let i = 0; i < results.length; i++){
          grupa = new Grupa(results[i].ime_grupa);
          grupa.id_grupa = results[i].id_grupa;
          grupe.push(grupa);
        }
      }
      return grupe;
    }

    // dohvaća sve članove grupe jedne grupe
    async fetchAllMembers(id_grupa){
      let results = await dbGetAllMembers(id_grupa);
      let clanovi = [];
      let clan;

      if (results.length > 0){
        for(let i = 0; i < results.length; i++){
          clan = new Sudionik(results[i].korisnicko_ime, results[i].lozinka, 
                      results[i].ime, results[i].prezime, results[i].datum_i_god_rod, 
                      results[i].email, results[i].br_tel, results[i].status, results[i].br_tel_odg_osobe);
          clanovi.push(clan);
        }
      }

      return clanovi;
    }

    static async fetchNGrupa(n){
      let results = await dbGetNGrupa(n);
      let grupe = [];
      let grupa;

      if (results.length > 0){
        for(let i = 0; i < results.length; i++){
          grupa = new Grupa(results[i].ime_grupa);
          grupa.id_grupa = results[i].id_grupa;
          grupe.push(grupa);
        }
      }
      return grupe;
    }


    // metoda za razvrstavanje sudionika u željeni broj grupa
    static async createGroups(brojGrupa){
        // u petlji napraviti traženi broj grupa i dodavati jednu po jednu u bazu
        // u tablicu Kamp u bazi odgovarajucem kampu dodati broj grupa
        // podijeliti sudionike po grupama tako da broj sudionika u grupi bude podjednak
      let sudionici = await Sudionik.fetchAllSudionik();
      let brojSudionika = sudionici.length;
      let brojSudGrupa = Math.floor(brojSudionika / brojGrupa);
      let ostatak = brojSudionika % brojSudionika;

      for(let i = 0; i < brojGrupa; i++){
        let ime_grupa = "Grupa_" + (i+1);
        let id_grupa = await dbCreateGroup(ime_grupa);

        let sudioniciGrupa = await Sudionik.fetchNSudionikWithoutGroup(brojSudGrupa);

        for(let j = 0; j < sudioniciGrupa.length; j++){
            sudioniciGrupa[j].changeSudionikGroup(id_grupa);
        }
      }

      if(ostatak != 0) {
        let preostaliSudionici = await Sudionik.fetchNSudionikWithoutGroup(ostatak);
        let grupe = await Grupa.fetchNGrupa(ostatak);

        for(let i = 0; i < ostatak; i++){
          preostaliSudionici[i].changeSudionikGroup(grupe[i].id_grupa);
        }
      }
      


    }

    //metoda za izmjenu imena grupe
/*     async changeGroupName(id_grupa){
      dbChangeGroupName(id_grupa, novo_ime_grupe);
    } */

}

dbCreateGroup = async (ime_grupa) => {
  const sql = 'INSERT INTO GRUPA (ime_grupa) VALUES($1) RETURNING id_grupa'; 
  try{
    const result = await db.query(sql, [ime_grupa]);
    return result.rows[0].id_grupa;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

dbGetAllGrupa = async () => {
  const sql = 'SELECT * FROM grupa';
  try{
      const result = await db.query(sql);
      return result.rows;
  } catch(err) {
      console.log(err);
      throw err;
  }
}

dbGetGrupaById = async (id_grupa) => {
  const sql = 'SELECT * FROM grupa WHERE id_grupa = $1';
  try{
      const result = await db.query(sql, [id_grupa]);
      return result.rows;
  } catch(err) {
      console.log(err);
      throw err;
  }
}

dbGetNGrupa = async (n) => {
  const sql = 'SELECT * FROM grupa LIMIT $1';
  try{
      const result = await db.query(sql, [n]);
      return result.rows;
  } catch(err) {
      console.log(err);
      throw err;
  }
}


dbGetAllMembers = async (id_grupa) => {
  const sql = `SELECT korisnik.*, br_tel_odg_osobe, id_grupa
  FROM sudionik JOIN korisnik ON korisnicko_ime_sudionik = korisnicko_ime NATURAL JOIN grupa WHERE id_grupa = $1`;
try{
  //console.log("Dohvat svih sudionika grupe")
  const result = await db.query(sql, [id_grupa]);
  return result.rows;
  } catch(err){
    console.log(err);
    throw err;
  }
}

/* dbChangeGroupName = async (id_grupa, novo_ime_grupe) => {
  const sql = 'UPDATE GRUPA SET ime_grupa = ' + novo_ime_grupe + 'WHERE id_grupa = ' + id_grupa;
  try {
    const result = await db.query(sql, [id_grupa]);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
} */


dbFetchAllGrupaSKampa = async (datum_odrzavanja_kamp, ime_kamp) =>{
  const sql = `SELECT grupa.* 
    FROM grupa NATURAL JOIN raspored NATURAL JOIN aktivnost
    WHERE datum_odrzavanja_kamp = $1 AND ime_kamp = $2`
  try {
    const result = await db.query(sql, [datum_odrzavanja_kamp, ime_kamp]);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
