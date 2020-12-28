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
    // vraca Korisnik
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
    // void
    async registerKorisnik(password){
        //dodati pozivanje funkcije za update baze
        dbSetKorisnikPassword(this.korisnicko_ime, password);

    }

    // vraca Boolean
    isPersisted(){
        return this.korisnicko_ime !== undefined;
    }

    // Provjerava lozinku
    // vraca Boolean
    checkPass(lozinka){
        return this.lozinka ? this.lozinka == lozinka && lozinka != null : false;
    }

    //pohrana korisnika u bazu podataka kod registracije
    // vraca String
    async addNewKorisnik() {
        try {
            let korisnickoIme = await dbAddNewKorisnik(this);
            this.korisnicko_ime = korisnickoIme;
            return this.korisnickoIme;
        } catch(err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err;
        }
    }
	
	//izbrisi ili updateaj korisnika
	async removeKorisnik(username){
		dbDeleteKorisnik(username);
	}
	
	async updateKorisnik(username){
		dbUpdateKorisnik(username, this.lozinka, this.email, this.ime, this.prezime);
	}
	
	//dohvati sve korisnike
	static async fetchAllKorisnik(korisnicko_ime){
            let results = await dbGetAllKorisnik(korisnicko_ime);
            let korisnici = [];

            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    let korisnik = new Korisnik(result[i].korisnicko_ime, result[i].lozinka, result[i].email,result[i].ime,
												 result[i].prezime, result[i].status);
                    //this.id_korisnik= results[i].id_korisnik; // id_korisnik ne postoji!!
                    korisnici.push(korisnik);
                }
            }         
            return korisnici;
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

dbSetKorisnikPassword = async (korisnicko_ime, lozinka) => {
    const sql = `UPDATE korisnik SET lozinka = $1 WHERE korisnicko_ime LIKE $2`;
    try {
        const result = await db.query(sql, [lozinka, korisnicko_ime]);
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
        //console.log("Dodajem novog korisnika");
        const result = await db.query(sql, [korisnik.korisnicko_ime, korisnik.lozinka, korisnik.email,
             korisnik.ime, korisnik.prezime, korisnik.status]);
        return result.rows[0].korisnicko_ime;
    } catch (err) {
        console.log(err);
        throw err
    }
}

//brisanje korisnika iz bp
dbDeleteKorisnik = async (korisnicko_ime) => {
    const sql = `DELETE FROM korisnik WHERE korisnicko_ime LIKE $1`;
    try {
		//console.log("Brisem korisnika")
        const result = await db.query(sql, [korisnicko_ime]);
    } catch (err) {
        console.log(err);
        throw err
    }
}

//update podataka
//update upit
dbUpdateKorisnik = async (korisnicko_ime, lozinka, email, ime, prezime) =>{
	const sql = `UPDATE korisnik SET lozinka = $1, email = $2, ime = $3, prezime = $4 WHERE korisnicko_ime LIKE $5 RETURNING korisnicko_ime`;
	 try {
        const result = await db.query(sql, [lozinka, email, ime, prezime, korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

//dohvat svih korisnika
// rezultat upita se ne obrađuje dobro. Opet pogledati kako se dohvacaju sve aktivnosti!
dbGetAllKorisnik = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status FROM korisnik WHERE korisnicko_ime LIKE $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



