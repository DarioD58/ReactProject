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

    // dohvaća korisnika s predanim imenom iz baze, ako postoji
    static async fetchKorisnikByUsername(username){
        let results = await dbGetUserByName(korisnicko_ime)
        let noviKorisnik = new Korisnik()

        if( results.length > 0 ) {
            noviKorisnik = new Korisnik(results[0].korisnicko_ime, results[0].lozinka, results[0].ime, 
                results[0].prezime, results[0].email, results[0].status)
        }
        return noviKorisnik;
    }


    // dodaje password za korisnika koji se registrira
    async registerUser(password){
        //dodati pozivanje funkcije za update baze
        dbSetUserPassword(this, password);

    }

    // Provjerava postoji li korisnik
    isPersisted() {
        return this.korisnicko_ime !== undefined;
    }

    // Provjerava lozinku
    checkPass(lozinka){
        return this.lozinka ? this.lozinka == lozinka : false;
    }

    //pohrana korisnika u bazu podataka kod registracije
    async addNewUser() {
        try {
            let korisnickoIme = await dbAddNewUser(this)
            this.korisnicko_ime = korisnickoIme
        } catch(err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err
        }
    }

    
}

/*
funkcije dodavanje i dohvaćanja podataka korisnika iz baze
u njima se pišu upiti
*/
dbSetUserPassword = async (korisnik, password) => {}
dbAddNewUser = async (korisnik) => {}