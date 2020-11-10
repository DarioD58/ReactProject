const db = require('../db');
const Korisnik = require('../models/Korisnik');

// razred Organizator - predstavlja organizatora kampa - admin
module.exports = class Organizator extends Korisnik{
    
    // konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
    }

        //implementacije funkcija


    static async fetchOrganizatorkByUsername(username){
        Korisnik.fetchKorisnikByUsername(username);
    }   

    isPersisted() {
        return this.korisnicko_ime !== undefined;
    }

    // Provjerava lozinku
    checkPass(lozinka){
        return this.lozinka ? this.lozinka == lozinka : false;
    }

}

//implementacije funkcija
