const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Sudionik - predstavlja jednog sudionika kampa
module.exports = class Sudionik extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod, br_tel_odg_osobe, motivacijsko_pismo){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
        this.br_tel = br_tel;
        this.datum_i_god_rod = datum_i_god_rod;
        this.br_tel_odg_osobe = br_tel_odg_osobe;
        this.motivacijsko_pismo = motivacijsko_pismo;
        this.id_grupa = undefined;
    }
    //implementacije funkcija

    async addNewSudionik() {
        dbAddNewAnimator(this);
    }

    static async fetchSudionikByUsername(korisnicko_ime){
        let results = await dbGetSudionikByName(korisnicko_ime)
        let noviSudionik = new Sudionik()

        if( results.length > 0 ) {
            noviSudionik = new Sudionik(results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                results[0].ime, results[0].prezime, results[0].status,
                results[0].br_tel, results[0].datum_i_god_rod, results[0].br_tel_odg_osobe, results[0].motivacijsko_pismo)

            noviSudionik.id_grupa = results[0].id_grupa
        }
        return noviSudionik
    }
	
}
//implementacije funkcija
dbGetSudionikByName = async (korisnicko_ime) => {}