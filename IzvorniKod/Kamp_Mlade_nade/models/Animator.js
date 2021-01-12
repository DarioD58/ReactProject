const db = require('../db');
const Korisnik = require('../models/Korisnik');
const Aktivnost = require('../models/Aktivnost');
//razred Animator - predstavlja jednog animatora kampa
module.exports = class Animator extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status){
        super(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status);
    }

    //implementacije funkcija

    // vraća String
    async addNewAnimator() {
        return await dbAddNewAnimator(this);
    }

    // vraca Aktivnost[]
    async fetchAnimatorActivities(){
        let results = await dbGetAnimatorActivities(this.korisnicko_ime);
        let aktivnosti = [];
        let aktivnost;

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                aktivnost = new Aktivnost(results[i].ime_aktivnost, results[i].opis_aktivnost,
                                            results[i].trajanje_aktivnost_h, results[i].tip_aktivnost, 
                                            results[i].datum_odrzavanja_kamp, results[i].ime_kamp);
                
                aktivnost.id_aktivnost = results[i].id_aktivnost;
                aktivnosti.push(aktivnost);
            }
        }       
        return aktivnosti;
    }

    async fetchAnimatorFinishedActivities(){
        let results = await dbGetAnimatorFinishedActivities(this.korisnicko_ime);
        let aktivnosti = [];
        let aktivnost;
   
        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                aktivnost = new Aktivnost(results[i].ime_aktivnost, results[i].opis_aktivnost,
                                            results[i].trajanje_aktivnost_h, results[i].tip_aktivnost, 
                                            results[i].datum_odrzavanja_kamp, results[i].ime_kamp);
                
                aktivnost.id_aktivnost = results[i].id_aktivnost;  
                aktivnosti.push(aktivnost);
            }
        }     
        
        return aktivnosti;
    }

    // vraća Animator
    static async fetchAnimatorByUsername(korisnicko_ime){
		let results = await dbGetAnimatorByUsername(korisnicko_ime);
        let animator;

        if( results.length > 0 ) {
            animator = new Animator(results[0].korisnicko_ime, results[0].lozinka, results[0].ime, 
                results[0].prezime, results[0].datum_i_god_rod, results[0].email, results[0].br_tel, results[0].status);
        }
        return animator;
    }

    //dohvati sve
	static async fetchAllAnimator(){
        let results = await dbAnimatorGetAll();
        let animatori = [];
        let animator;

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                animator = new Animator(results[i].korisnicko_ime, results[i].lozinka, results[i].ime, 
                    results[i].prezime, results[i].datum_i_god_rod, results[i].email, results[i].br_tel, results[i].status);
                animatori.push(animator);
            }
        }         
        return animatori;
    }
}

//implementacije funkcija
dbAddNewAnimator = async (animator) => {
    const sql = "INSERT INTO animator (korisnicko_ime_animator) VALUES ($1) RETURNING korisnicko_ime_animator";
    try {
        await animator.addNewKorisnik();
        const result = await db.query(sql, [animator.korisnicko_ime]);
        return result.rows[0].korisnicko_ime_animator;
    } catch (error) {
        console.log(err);
        throw err
    }
}
dbGetAnimatorByUsername = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status
    FROM animator JOIN korisnik ON korisnicko_ime_animator = korisnicko_ime 
    WHERE korisnicko_ime = $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//dohvati sve animatore
dbAnimatorGetAll = async () => {
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status
    FROM animator JOIN korisnik ON korisnicko_ime_animator = korisnicko_ime`;
    try {
        const result = await db.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetAnimatorActivities = async (korisnicko_ime_animator) => {
    const sql = `SELECT aktivnost.id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM raspored NATURAL JOIN aktivnost NATURAL JOIN animator WHERE korisnicko_ime_animator LIKE $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime_animator]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetAnimatorFinishedActivities = async (korisnicko_ime_animator) => {
    const sql = `SELECT DISTINCT aktivnost.id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM raspored NATURAL JOIN aktivnost NATURAL JOIN animator 
    WHERE korisnicko_ime_animator LIKE $1 AND datum_i_vrijeme_izvrsavanja < CURRENT_TIMESTAMP(0)`;
    try {
        const result = await db.query(sql, [korisnicko_ime_animator]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



