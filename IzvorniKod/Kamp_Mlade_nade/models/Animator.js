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
    
	static async fetchAll(username){
            let results = await dbAnimatorGetAllGetAll(korisnicko_ime);
            let animatori = [];

            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    let animator = new Aktivnost(result[i].korisnicko_ime, result[i].lozinka, result[i].email,result[i].ime,
												 result[i].prezime, result[i].status, result[i].br_tel, 
                                                 result[i].datum_i_god_rod);
                    this.id_animator= results[i].id_animator;
                    animatori.push(animatori);
                }
            }         
            return animatori;
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
dbAnimatorGetAll = async (korisnicko_ime) => {
    const sql = `SELECT lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod FROM animator WHERE ime_kamp LIKE $1`;
    try {
        const result = await db.query(sql, korisnicko_ime);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
