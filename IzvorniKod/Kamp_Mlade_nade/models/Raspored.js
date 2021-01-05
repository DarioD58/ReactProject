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
        return await dbAddToRaspored(this);
  
    }

    async static setDefaultActivities(){
        let kamp = await Kamp.fetchUpcoming();
        let dorucakAkt = await Aktivnost.fetchAktivnostByName("Doručak", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let rucakAkt = await Aktivnost.fetchAktivnostByName("Ručak", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let veceraAkt = await Aktivnost.fetchAktivnostByName("Večera", kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
        let grupe = await Grupa.fetchAllGrupa();
        let animatori = await Animator.fetchAllAnimator();

        for(let i = 0; i < kamp.trajanje; i++){
            for(let j = 0; j < grupe.lenght; j++){
                await dbAddToRaspored(dorucakAkt.id_aktivnost, grupe[j].id_grupa, kamp.datum_odrzavanja_kamp+i*24+8, null);
                await dbAddToRaspored(rucakAkt.id_aktivnost, grupe[j].id_grupa, kamp.datum_odrzavanja_kamp+i*24+12, null);
                await dbAddToRaspored(veceraAkt.id_aktivnost, grupe[j].id_grupa, kamp.datum_odrzavanja_kamp+i*24+18, null);                
            }

            for(let j = 0; j < animatori.lenght; j++){
                await dbAddToRaspored(dorucakAkt.id_aktivnost, null, kamp.datum_odrzavanja_kamp+i*24+8, animatori[j]);
                await dbAddToRaspored(rucakAkt.id_aktivnost, null, kamp.datum_odrzavanja_kamp+i*24+12, animatori[j]);
                await dbAddToRaspored(veceraAkt.id_aktivnost, null, kamp.datum_odrzavanja_kamp+i*24+18, animatori[j]);                
            }
        }

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
	
 
dbAddToRaspored = async (raspored) => {
    const sql = `INSERT INTO raspored (datum_i_vrijeme_izvrsavanja, id_aktivnost, id_grupa, korisnicko_ime_animator)
     VALUES ($1, $2, $3, $4) RETURNING id_aktivnost`;
    try {
        //console.log("Dodajem novu aktivnost");
        const result = await db.query(sql, [raspored.datum_i_vrijeme_izvrsavanja, raspored.id_aktivnost, raspored.id_grupa, raspored.korisnicko_ime_animator]);
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