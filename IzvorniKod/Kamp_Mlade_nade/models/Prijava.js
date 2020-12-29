const db = require('../db');


// razred Prijava - predstavlja prijavu jednog sudionika ili 
// animatora na kamp

module.exports = class Prijava {

    // konstruktor
    constructor(korisnik, motivacijsko_pismo, status_prijava, kamp){
        this.id_prijava = undefined;    // number
        this.korisnik = korisnik;   // Korisnik
        this.motivacijsko_pismo = motivacijsko_pismo;   // string
        this.status_prijava = status_prijava;   // string
        this.kamp = kamp;   // Kamp
    }

    // vraca String
    async addNewPrijava() {
        this.id_prijava = await dbAddNewPrijava(this);
        return this.id_prijava;
    }
    
    // vraca String ili null
    static async checkPrijavaForUsername(korIme){
        return await dbCheckPrijavaForUsername(korIme);
    }


    static async fetchActivePrijava(){
        return await dbFetchActivePrijava();
    }

    static async changeStatusPrijava(id, status){
        return await dbChangeStatusPrijava(id,status);
    }
}

// ovdje su dobro iskoristeni argumenti
dbAddNewPrijava = async (prijava) => {
    const sql = `INSERT INTO prijava (korisnicko_ime, status_prijava, 
    ime_kamp, datum_odrzavanja_kamp, motivacijsko_pismo) VALUES ($1 ,$2, $3, $4, $5) RETURNING id_prijava`;
    try {
        const result = await db.query(sql, [prijava.korisnik.korisnicko_ime, prijava.status_prijava, prijava.kamp.ime_kamp,
            prijava.kamp.datum_odrzavanja_kamp, prijava.motivacijsko_pismo]);
        return result.rows[0].id_prijava;
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}

// ovdje su dobro iskoristeni argumenti
dbCheckPrijavaForUsername = async (korIme) => {
    const sql = `SELECT id_prijava FROM prijava WHERE korisnicko_ime = $1`;
    try {
        const result = await db.query(sql, [korIme]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Dohvatiti sve podatke o prijavi i u pozivajućoj metodi stvoriti nove instance prijave
dbFetchActivePrijava = async() => {
    const sql = 'SELECT id_prijava FROM prijava WHERE status_prijava = "aktivna"';
    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}

// Popraviti modificiranje upita. Za referencu pogledati druge upite npr. gornji upiti
// Ovakav unos teksta omogućuje SQL injection
dbChangeStatusPrijava = async(id, status) => {
    const sql = 'UPDATE PRIJAVA SET status_prijava = ' + status + 'WHERE id_prijava = ' + id;
    try{
        const result = await db.query(sql, [id, status]);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}