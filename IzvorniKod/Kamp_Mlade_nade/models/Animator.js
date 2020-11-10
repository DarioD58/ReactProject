const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Animator - predstavlja jednog animatora kampa
module.exports = class Animator extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status,
        br_tel, datum_i_god_rod, motivacijsko_pismo){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
        this.br_tel = br_tel;
        this.datum_i_god_rod = datum_i_god_rod;
        this.br_tel_odg_osobe = br_tel_odg_osobe;
        this.motivacijsko_pismo = motivacijsko_pismo;
        this.id_grupa = undefined;
    }

    //implementacije funkcija

    static async fetchAnimatorByUsername(username){
		let results = await dbGetUserByName(korisnicko_ime)
        let noviAnimator = new Animator()

        if( results.length > 0 ) {
            noviAnimator = new Animator(results[0].br_tel, results[0].datum_i_god_rod, 
                results[0].motivacijsko_pismo)
            noviAnimator.id_grupa = results[0].id_grupa
        }
        return noviAnimator
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
}

//implementacije funkcija
