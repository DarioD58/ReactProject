const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Animator - predstavlja jednog animatora kampa
module.exports = class Animator extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
        this.br_tel = br_tel;   // string
        this.datum_i_god_rod = datum_i_god_rod; // Date
        this.br_tel_odg_osobe = br_tel_odg_osobe; // string
        this.id_grupa = undefined;  // number
    }

    //implementacije funkcija

    // vraća String
    async addNewAnimator() {
        return await dbAddNewAnimator(this);
    }

    // vraća Animator
    static async fetchAnimatorByUsername(username){
		let results = await dbGetAnimatorByUsername(korisnicko_ime)
        let noviAnimator = new Animator()

        if( results.length > 0 ) {
            noviAnimator = new Animator(results[0].korisnicko_ime, results[0].lozinka, 
                results[0].email, results[0].ime, results[0].prezime, results[0].status,
                results[0].br_tel_animator, results[0].datum_i_god_rod_animator);
            
            noviAnimator.id_grupa = results[0].id_grupa;
        }
        return noviAnimator;
    }


}

//implementacije funkcija
dbAddNewAnimator = async (animator) => {
    const sql = `INSERT INTO animator (korisnicko_ime_animator, br_tel_animator, datum_i_god_rod_animator) 
    VALUES ($1, $2, $3, $4) RETURNING korisnicko_ime_sudionik`;
    try {
        await sudionik.addNewUser();
        const result = await db.query(sql, [sudionik.korisnicko_ime, sudionik.br_tel,
             sudionik.datum_i_god_rod, sudionik.br_tel_odg_osobe]);
        return result.rows[0].korisnicko_ime_sudionik;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
dbGetAnimatorByUsername = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status,
    br_tel_animator, datum_i_god_rod_animator
    FROM animator JOIN korisnik ON korisnicko_ime_animator = korisnicko_ime WHERE korisnicko_ime = $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}
