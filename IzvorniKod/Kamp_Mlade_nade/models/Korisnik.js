const db = require('../db');

// razred Korisnik - generalizacija svih korisnika web aplikacije

module.exports = class Korisnik {

    //konstruktor korisnika
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status){
        this.korisnicko_ime = korisnicko_ime;
        this.lozinka = lozinka;
        this.email = email;
        this.ime = ime;
        this.prezime = prezime;
        this.status = status;
    }

    /*
    funkcije za dodavanje i dohvaćanje korisnika
    pozivaju funkcije za rad s bazom
    treba ih implementirati za svakog od korisnika:
        organizator, animator, sudionik.
    */
    
}

/*
funkcije dodavanje i dohvaćanja podataka korisnika iz baze
u njima se pišu upiti
*/