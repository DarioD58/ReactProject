const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Sudionik - predstavlja jednog sudionika kampa
module.exports = class Sudionik extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod, br_tel_odg_osobe){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
        this.br_tel = br_tel;
        this.datum_i_god_rod = datum_i_god_rod;
        this.br_tel_odg_osobe = br_tel_odg_osobe;
        this.id_grupa = undefined;
    }
    //implementacije funkcija

    async addNewSudionik() {
        return await dbAddNewSudionik(this);
    }

    static async fetchSudionikByUsername(korisnicko_ime){
        let results = await dbGetSudionikBUsername(korisnicko_ime);
        let noviSudionik = new Sudionik();

        if( results.length > 0 ) {
            noviSudionik = new Sudionik(results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                results[0].ime, results[0].prezime, results[0].status,
                results[0].br_tel_sudionik, results[0].datum_i_god_rod_sudionik, results[0].br_tel_odg_osobe);

            noviSudionik.id_grupa = results[0].id_grupa;
        }
        return noviSudionik;
    }
	


}
//implementacije funkcija
dbGetSudionikByUsername = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status,
    br_tel_sudionik, datum_i_god_rod, br_tel_odg_osobe, id_grupa
    FROM sudionik JOIN korisnik ON korisnicko_ime_sudionik = korisnicko_ime WHERE korisnicko_ime = ` + korisnicko_ime;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbAddNewSudionik = async (sudionik) => {
    const sql = "INSERT INTO sudionik (korisnicko_ime_sudionik, br_tel_sudionik, datum_i_god_rod_sudionik, br_tel_odg_osobe) VALUES ('" +
    sudionik.korisnicko_ime + "', '" + sudionik.br_tel + "', '" + sudionik.datum_i_god_rod + "', '" + 
    sudionik.br_tel_odg_osobe + "', '" + sudionik.motivacijsko_pismo + "') RETURNING korisnicko_ime_sudionik";
    try {
        await sudionik.addNewKorisnik();
        const result = await db.query(sql, []);
        return result.rows[0].korisnicko_ime_sudionik;
    } catch (err) {
        console.log(err);
        throw err;
    }
}