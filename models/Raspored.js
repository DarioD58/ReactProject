const db = require('../db');
const Kamp = require('./Kamp');
const Aktivnost = require('./Aktivnost');
const Grupa = require('./Grupa');
const Animator = require('./Animator');

module.exports = class Raspored {
    //konstruktor
    constructor(id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator){
        this.id_grupa = id_grupa;   // number
        this.id_aktivnost = id_aktivnost;     // number
        this.datum_i_vrijeme = datum_i_vrijeme;   // Date
        this.korisnicko_ime_animator = korisnicko_ime_animator;  // string
    }   
	
    // implementacija generičkih funkcionalnost za dohvat, uređivanje, brisanje...
    
    // svasta se događa u ovoj metodi - nije dobro!
	async addToRaspored() {
        //console.log(this);
        return await dbAddToRaspored(this);
  
    }

    /* static async setDefaultActivities(){
        let kamp = await Kamp.fetchUpcoming();
        let dorucakAkt = await Aktivnost.fetchAktivnostByName("Doručak", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let rucakAkt = await Aktivnost.fetchAktivnostByName("Ručak", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let veceraAkt = await Aktivnost.fetchAktivnostByName("Večera", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let grupe = await Grupa.fetchAllGrupa();
        let animatori = await Animator.fetchAllAnimator();

        for(let i = 0; i < kamp.trajanje; i++){
            for(let j = 0; j < grupe.length; j++) {
                await dbAddToRaspored(new Raspored(grupe[j].id_grupa, dorucakAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+8, null));
                await dbAddToRaspored(new Raspored(grupe[j].id_grupa, rucakAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+12, null));
                await dbAddToRaspored(new Raspored(grupe[j].id_grupa, veceraAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+18, null));          
            }

            for(let j = 0; j < animatori.length; j++){
                await dbAddToRaspored(new Raspored(null, dorucakAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+8, animatori[j]));
                await dbAddToRaspored(new Raspored(null, rucakAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+12, animatori[j]));
                await dbAddToRaspored(new Raspored(null, veceraAkt.id_aktivnost, kamp.datum_odrzavanja_kamp+i*24+18, animatori[j])); 
            }
        } 

    }*/

    static async fetchRasporedAktivnostiForAnimator(korisnicko_ime_animator) {
        let results = await dbGetRasporedAktivnostiForAnimator(korisnicko_ime_animator);
        let aktivnostiURasporedu = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let rasporedAktivnost = {
                    id: i,
                    title: results[i].ime_aktivnost,
                    start: results[i].datum_i_vrijeme_izvrsavanja,
                    end: results[i].kraj_aktivnost
                }
                aktivnostiURasporedu.push(rasporedAktivnost);
            }
        }       
        return aktivnostiURasporedu;
    }

    static async fetchRasporedAktivnostiForSudionik(id_grupa, korisnicko_ime_sudionik) {
        let results = await dbGetRasporedAktivnostiForSudionik(id_grupa, korisnicko_ime_sudionik);
        let aktivnostiURasporedu = [];
 
        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let rasporedAktivnost = {
                    id: i,
                    title: results[i].ime_aktivnost,
                    start: results[i].datum_i_vrijeme_izvrsavanja,
                    end: results[i].kraj_aktivnost
                }
                aktivnostiURasporedu.push(rasporedAktivnost);
            }
        }       
        return aktivnostiURasporedu;
    }



    static async checkActivityTypeOverlap(datum_i_vrijeme, tip_aktivnost) {
        return await dbCheckActivityTypeOverlap(datum_i_vrijeme, tip_aktivnost);
    }

    static async checkActivityTimeOverlap(datum_i_vrijeme, trajanje_aktivnost_h) {
        return await dbCheckActivityTimeOverlap(datum_i_vrijeme, trajanje_aktivnost_h);
    }
    
    static async checkGrupaOverlap(id_grupa) {
        return await dbCheckGrupaOverlap(id_grupa);
    }

    static async checkAnimatorOverlap(korisnicko_ime, datum_i_vrijeme){
        return await dbCheckAnimatorOverlap(korisnicko_ime, datum_i_vrijeme);
    }

/* 	async updateInRaspored(id_aktivnost){
		dbUpdateInRaspored (this.id_grupa, id_aktivnost,this.datum_i_vrijeme, this.korisnicko_ime_animator);
	} */
	
	async deleteFromRaspored(id_grupa, id_aktivnost, datum_i_vrijeme_izvrsavanja){
		dbDeleteFromRaspored(id_grupa, id_aktivnost, datum_i_vrijeme_izvrsavanja);
	}
	
	async deleteteRaspored(){
		dbDeleteRaspored();
	}
}

dbGetRasporedAktivnostiForSudionik = async (id_grupa, korisnicko_ime_sudionik) => {
    const sql = `SELECT DISTINCT ime_aktivnost, datum_i_vrijeme_izvrsavanja, datum_i_vrijeme_izvrsavanja + INTERVAL '1 hour' * trajanje_aktivnost_h AS kraj_aktivnost
                FROM raspored NATURAL JOIN aktivnost NATURAL JOIN grupa NATURAL JOIN sudionik
                WHERE id_grupa = $1 AND korisnicko_ime_sudionik = $2`;
    try {
        const result = await db.query(sql, [id_grupa, korisnicko_ime_sudionik]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbGetRasporedAktivnostiForAnimator = async (korisnicko_ime_animator) => {
    const sql = `SELECT DISTINCT ime_aktivnost, datum_i_vrijeme_izvrsavanja, datum_i_vrijeme_izvrsavanja + INTERVAL '1 hour' * trajanje_aktivnost_h AS kraj_aktivnost
                FROM raspored NATURAL JOIN aktivnost
                WHERE korisnicko_ime_animator = $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime_animator]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbCheckAnimatorOverlap = async (korisnicko_ime, datum_i_vrijeme) => {
    const sql = `SELECT COUNT(*)
                FROM raspored NATURAL JOIN aktivnost
                WHERE korisnicko_ime_animator = $1 
                AND $2 BETWEEN datum_i_vrijeme_izvrsavanja AND datum_i_vrijeme_izvrsavanja + INTERVAL '1 hour' * trajanje_aktivnost_h`;
    try {
    //console.log("Dodajem novu aktivnost");
    const result = await db.query(sql, [korisnicko_ime, datum_i_vrijeme]);
    return result.rows[0];
    } catch (err) {
    console.log(err);
    throw err
    }
}

dbCheckGrupaOverlap = async (id_grupa) => {
    const sql = `SELECT COUNT(*)
                FROM raspored 
                WHERE id_grupa = $1`;
   try {
       //console.log("Dodajem novu aktivnost");
       const result = await db.query(sql, [id_grupa]);
       return result.rows[0];
   } catch (err) {
       console.log(err);
       throw err
   }
}

dbCheckActivityTimeOverlap = async (datum_i_vrijeme, trajanje_aktivnost_h) => {
    const sql = `SELECT COUNT(*)
                FROM raspored NATURAL JOIN aktivnost
                WHERE $1 BETWEEN datum_i_vrijeme_izvrsavanja AND datum_i_vrijeme_izvrsavanja + INTERVAL '1 hour' * $2`;
   try {
       //console.log("Dodajem novu aktivnost");
       const result = await db.query(sql, [datum_i_vrijeme, trajanje_aktivnost_h]);
       return result.rows[0];
   } catch (err) {
       console.log(err);
       throw err
   }
}

dbCheckActivityTypeOverlap = async (datum_i_vrijeme, tip_aktivnost) => {
    const sql = `SELECT COUNT(*)
                FROM raspored NATURAL JOIN aktivnost
                WHERE datum_i_vrijeme_izvrsavanja = $1 AND tip_aktivnost = $2`;
   try {
       //console.log("Dodajem novu aktivnost");
       const result = await db.query(sql, [datum_i_vrijeme, tip_aktivnost]);
       return result.rows[0];
   } catch (err) {
       console.log(err);
       throw err
   }
}
 
dbAddToRaspored = async (raspored) => {
    const sql = `INSERT INTO raspored (datum_i_vrijeme_izvrsavanja, id_aktivnost, id_grupa, korisnicko_ime_animator)
     VALUES ($1, $2, $3, $4) RETURNING id_aktivnost`;
    try {
        //console.log("Dodajem novu aktivnost");
        const result = await db.query(sql, [raspored.datum_i_vrijeme, raspored.id_aktivnost,
             raspored.id_grupa, raspored.korisnicko_ime_animator]);
        return result.rows[0].id_aktivnost;
    } catch (err) {
        console.log(err);
        throw err
    }
}

/* dbUpdateInRaspored = async (id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator) => {
	const sql = `UPDATE raspored SET id_grupa = $1, id_aktivnost = $2, datum_i_vrijeme_izvrsavanja = $3, korisnicko_ime_animator = '$4' 
		WHERE id_aktivnost = $2`;
	 try {
        const result = await db.query(sql, [id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }

} */

dbDeleteFromRaspored = async (id_aktivnost, id_grupa, datum_i_vrijeme) => {
    const sql = `DELETE FROM raspored WHERE id_aktivnost = $1 AND id_grupa = $2 AND datum_i_vrijeme_izvrsavanja = $3`;
    try {
        const result = await db.query(sql, [id_aktivnost, id_grupa, datum_i_vrijeme]);
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbDeleteRaspored = async () =>{
	const sql = `DELETE FROM raspored`;
	try {
        const result = await db.query(sql, id_aktivnost);
    } catch (err) {
        console.log(err);
        throw err
	}
}