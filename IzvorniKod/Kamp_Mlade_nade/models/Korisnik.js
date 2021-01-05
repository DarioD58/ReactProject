const db = require('../db');

// razred Korisnik - generalizacija svih korisnika web aplikacije

module.exports = class Korisnik {

    //konstruktor korisnika
    constructor(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status){
        this.korisnicko_ime = korisnicko_ime;  // String
        this.lozinka = lozinka; // String
        this.ime = ime; // String
        this.prezime = prezime; // String
        this.datum_i_god_rod = datum_i_god_rod; // Date
        this.email = email; // String
        this.br_tel = br_tel; // String
        this.status = status;  // String        
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
        let korisnik;

        if( results.length > 0 ) {
            korisnik = new Korisnik(results[0].korisnicko_ime, results[0].lozinka, results[0].ime, results[0].prezime, 
                                    results[0].datum_i_god_rod, results[0].email, results[0].br_tel, results[0].status);
        }

        return korisnik;
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

    // pohrana korisnika u bazu podataka kod registracije
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
		dbUpdateKorisnik(username, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status);
	}
	
	//dohvati sve korisnike
	static async fetchAllKorisnik(){
            let results = await dbGetAllKorisnik();
            let korisnici = [];
            let korisnik;
            
            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    korisnik = new Korisnik(results[i].korisnicko_ime, results[i].lozinka, 
                        results[i].ime, results[i].prezime, results[i].datum_i_god_rod, 
                        results[i].email, results[i].br_tel, results[i].status);
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
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status
	FROM korisnik WHERE korisnicko_ime LIKE $1`;
    try {
        const result = await db.query(sql, [username]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbSetKorisnikPassword = async (korisnicko_ime, lozinka) => {
    const sql = `UPDATE korisnik SET lozinka = $1 WHERE korisnicko_ime LIKE $2`;
    try {
        const result = await db.query(sql, [lozinka, korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
dbAddNewKorisnik = async (korisnik) => {
    const sql = `INSERT INTO korisnik (korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING korisnicko_ime`;
    try {
        //console.log("Dodajem novog korisnika");
        const result = await db.query(sql, [korisnik.korisnicko_ime, korisnik.lozinka, korisnik.ime,
            korisnik.prezime, korisnik.datum_i_god_rod, korisnik.email, korisnik.br_tel, korisnik.status]);
        return result.rows[0].korisnicko_ime;
    } catch (err) {
        console.log(err);
        throw err;
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
        throw err;
    }
}

//update podataka
//update upit
dbUpdateKorisnik = async (korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status) =>{
    const sql = `UPDATE korisnik SET lozinka=$1, ime=$2, prezime=$3, datum_i_god_rod=$4, 
        email=$5, br_tel=$6, status=$7 
        WHERE korisnicko_ime LIKE $8 RETURNING korisnicko_ime`;
	 try {
        const result = await db.query(sql, [lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status, korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//dohvat svih korisnika
// rezultat upita se ne obrađuje dobro. Opet pogledati kako se dohvacaju sve aktivnosti!
dbGetAllKorisnik = async () => {
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status FROM korisnik`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



