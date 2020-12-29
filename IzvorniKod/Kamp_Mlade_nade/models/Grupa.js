const db = require('../db');
const Sudionik = require('../models/Sudionik');
const Korisnik = require('./Korisnik');

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
      if (results.length > 0){
        for(let i = 0; i < results.length; i++){
          let grupa = new Grupa(results[i].id_grupa, results[i].ime_grupa);
          grupe.push(grupa);
        }
      }
      return grupe;
    }

    // dohvaća sve članove grupe jedne grupe: iz tablice sudionik i grupa spojiti po id_grupa
    async getAllMembers(id_grupa){
      let results = await dbGetAllMembers(id_grupa);
      let clanovi = [];
      if (results.length > 0){
        for(let i = 0; i < results.length; i++){
          let clan = new Korisnik(results[i].korisnicko_ime, results[i].lozinka)
        }
      }


    }


    // metoda za razvrstavanje sudionika u željeni broj grupa
    static async createGroups(brojGrupa){
        // u petlji napraviti traženi broj grupa i dodavati jednu po jednu u bazu
        // u tablicu Kamp u bazi odgovarajucem kampu dodati broj grupa
        // podijeliti sudionike po grupama tako da broj sudionika u grupi bude podjednak
    }

}

dbGetAllGrupa = async () => {
 const sql = 'SELECT * FROM grupa';
 try{
   await grupa.fetchAllGrupa();
   //console.log("Dohvat svih grupa")
   const result = await db.query(sql);
   return result.rows;
 } catch(err) {
    console.log(err);
    throw err;
 }
}

dbGetAllMembers = async (id_grupa) => {
  const sql = 'SELECT korisnik.korisnicko_ime FROM GRUPA JOIN KORISNIK NATURAL JOIN ON' + id_grupa;
try{
  await grupa.getAllMembers();
  //console.log("Dohvat svih sudionika grupe")
  const result = await db.query(sql, [sudionik.korisnicko_ime_sudionik]);
  return result.rows;
  } catch(err){
    console.log(err);
    throw err;
  }
}
