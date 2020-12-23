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
        }
        return noviAnimator;
    }

    //dohvati sve
    async getAnimatorAll(){
		 dbAnimatorGetAll();
	}
}

//implementacije funkcija
dbAddNewAnimator = async (animator) => {
    const sql = `INSERT INTO animator (korisnicko_ime_animator, br_tel_animator, datum_i_god_rod_animator) 
    VALUES ($1, $2, $3) RETURNING korisnicko_ime_animator`;
    try {
        await animator.addNewKorisnik();
        //console.log("Dodajem novog animatora")
        const result = await db.query(sql, [animator.korisnicko_ime, animator.br_tel,
             animator.datum_i_god_rod]);
        return result.rows[0].korisnicko_ime_animator;
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

//dohvati sve animatore
// nije dobro - pogledati u aktivnosti kako se dohvacaju sve aktivnosti
dbAnimatorGetAll = async() =>{
	const sql = `SELECT * FROM animator`;
	try {
        const result = await db.query([animator.korisnicko_ime, animator.lozinka, animator.email, animator.ime, animator.prezime, animator.status, animator.br_tel, animator.datum_i_god_rod]);
        return result.rows[0].korisnicko_ime_animator;
    } catch (err) {
        console.log(err);
        throw err
    }
}
