const db = require('../db');

// razred Korisnik - generalizacija svih korisnika web aplikacije

module.exports = class Korisnik {

    //konstruktor korisnika
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status){
        this.korisnicko_ime = korisnicko_ime;  // string
        this.lozinka = lozinka; // string
        this.email = email; // string
        this.ime = ime; // string
        this.prezime = prezime; // string
        this.status = status;   // string
    }

    /*
    funkcije za dodavanje i dohvaćanje korisnika
    pozivaju funkcije za rad s bazom
    treba ih implementirati za svakog od korisnika:
        organizator, animator, sudionik.
    */

    // dohvaća korisnika s predanim imenom iz baze, ako postoji
    static async fetchKorisnikByUsername(username){
        let results = await dbGetKorisnikByUsername(username)
        let noviKorisnik = new Korisnik()

        if( results.length > 0 ) {
            noviKorisnik = new Korisnik(results[0].korisnicko_ime, results[0].lozinka, results[0].email, results[0].ime, 
                results[0].prezime, results[0].status)
        }
        return noviKorisnik;
    }


    // dodaje password za korisnika koji se registrira
    async registerKorisnik(password){
        //dodati pozivanje funkcije za update baze
        dbSetKorisnikPassword(this.korisnicko_ime, password);

    }

    isPersisted(){
        return this.korisnicko_ime !== undefined;
    }

    // Provjerava lozinku
    checkPass(lozinka){
        return this.lozinka ? this.lozinka == lozinka : false;
    }

    //pohrana korisnika u bazu podataka kod registracije
    async addNewKorisnik() {
        try {
            let korisnickoIme = await dbAddNewKorisnik(this);
            this.korisnicko_ime = korisnickoIme;
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
dbGetKorisnikByUsername = async (username) => {
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, email, status 
    FROM korisnik WHERE korisnicko_ime LIKE $1`;
    try {
        const result = await db.query(sql, [username]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}
dbSetKorisnikPassword = async (korisnicko_ime, password) => {
    const sql = "UPDATE TABLE korisnik SET lozinka = $1 WHERE korisnicko_ime = $2";
    try {
        const result = await db.query(sql, [password, korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}
dbAddNewKorisnik = async (korisnik) => {
    const sql = `INSERT INTO korisnik (korisnicko_ime, lozinka, email, ime, prezime, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING korisnicko_ime`;
    try {
        const result = await db.query(sql, [korisnik.korisnicko_ime, korisnik.lozinka, korisnik.email,
             korisnik.ime, korisnik.prezime, korisnik.status]);
        return result.rows[0].korisnicko_ime;
    } catch (err) {
        console.log(err);
        throw err
    }
}