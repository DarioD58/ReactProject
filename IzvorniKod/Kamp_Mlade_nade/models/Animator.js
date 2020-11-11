const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Animator - predstavlja jednog animatora kampa
module.exports = class Animator extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
        this.br_tel = br_tel;
        this.datum_i_god_rod = datum_i_god_rod;
        this.br_tel_odg_osobe = br_tel_odg_osobe;
        this.id_grupa = undefined;
    }

    //implementacije funkcija
    async addNewAnimator() {
        dbAddNewAnimator(this);
    }

    static async fetchAnimatorByUsername(username){
		let results = await dbGetAnimatorByUsername(korisnicko_ime)
        let noviAnimator = new Animator()

        if( results.length > 0 ) {
            noviAnimator = new Animator(results[0].korisnicko_ime, results[0].lozinka, 
                results[0].email, results[0].ime, results[0].prezime, results[0].status,
                results[0].br_tel_animator, results[0].datum_i_god_rod_animator, results[0].motivacijsko_pismo)
            
            noviAnimator.id_grupa = results[0].id_grupa
        }
        return noviAnimator
    }


}

//implementacije funkcija
dbAddNewAnimator = async (animator) => {
    const sql = "INSERT INTO animator (korisnicko_ime_animator, br_tel_animator, datum_i_god_rod_animator) VALUES ('" +
    sudionik.korisnicko_ime + "', '" + sudionik.br_tel + "', '" + sudionik.datum_i_god_rod + "', '" + 
    sudionik.br_tel_odg_osobe + "', '" + sudionik.motivacijsko_pismo + "') RETURNING korisnicko_ime_sudionik";
    try {
        await sudionik.addNewUser();
        const result = await db.query(sql, []);
        return result.rows[0].korisnicko_ime_sudionik;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
dbGetAnimatorByUsername = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status,
    br_tel_sudionik, datum_i_god_rod, br_tel_odg_osobe
    FROM animator JOIN korisnik ON korisnicko_ime_animator = korisnicko_ime WHERE korisnicko_ime = ` + korisnicko_ime;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}
