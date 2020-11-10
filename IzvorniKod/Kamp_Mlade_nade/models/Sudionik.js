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

    static async fetchSudionikByUsername(username){
        let results = await dbGetUserByName(username)
        let newUser = new User()

        if( results.length > 0 ) {
            noviSudionik = new Sudionik(results[0].br_tel, results[0].datum_i_god_rod, 
                results[0].motivacijsko_pismo)
            noviSudionik.id_grupa = results[0].id_grupa
        }
        return newSudionik
    }
	
	isPersisted() {
        return this.korisnicko_ime !== undefined;
    }
	
	 checkPassword(password) {
        return this.password ? this.password == password : false
    }
	
	getIdGrupa(){
        return this.id_grupa;
    }

}
//implementacije funkcija
