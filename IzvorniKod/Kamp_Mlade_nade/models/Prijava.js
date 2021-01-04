const db = require('../db');


// razred Prijava - predstavlja prijavu jednog sudionika ili 
// animatora na kamp

module.exports = class Prijava {

    // konstruktor
    constructor (status_prijava, ime, prezime, datum_i_god_rod, email, br_tel, br_tel_odg_osobe,
        motivacijsko_pismo, status_korisnik, datum_odrzavanja_kamp, ime_kamp){
        this.id_prijava = undefined;    // Number
        this.status_prijava = status_prijava;   // String
        this.ime = ime;   // String
        this.prezime = prezime  // String
        this.datum_i_god_rod = datum_i_god_rod; // Date
        this.email = email; // String
        this.br_tel = br_tel; // String
        this.br_tel_odg_osobe = br_tel_odg_osobe; // String
        this.motivacijsko_pismo = motivacijsko_pismo;   // String
        this.status_korisnik = status_korisnik; // String
        this.datum_i_vrijeme_prijava = undefined; // Date
        this.datum_odrzavanja_kamp = datum_odrzavanja_kamp;   // Date
        this.ime_kamp = ime_kamp; // String
    }

    // vraca String
    async addNewPrijava() {
        this.id_prijava = await dbAddNewPrijava(this);
        return this.id_prijava;
    }
    
    // vraca String ili null
    static async checkExistingPrijava(ime, prezime){
        return await dbCheckExistingPrijava(ime, prezime);
    }

    // dohbvaca aktivne prijave
    static async fetchActivePrijava(){
        let results = await dbFetchActivePrijava();
        let prijave = [];

        if(results.length > 0) {
            for(let i = 0; i < results.length; i++){
            let prijava = new Prijava(results[i].status_prijava, results[i].ime, results[i].prezime, results[i].datum_i_god_rod, 
                            results[i].email, results[i].br_tel, results[i].br_tel_odg_osobe, results[i].motivacijsko_pismo, 
                            results[i].status_korisnik, results[i].datum_odrzavanja_kamp, results[i].ime_kamp);

            prijava.id_prijava = results[i].id_prijava;
            prijava.datum_i_vrijeme_prijava = results[i].datum_i_vrijeme_prijava;
            prijave.push(prijava);
            }
        }         
        return prijave;
    }

    // Dohvaća prijavu za id_prijava
    static async fetchPrijava(id_prijava){
        let results = await dbGetPrijava(id_prijava);
        let prijava;

        if(results.length > 0) {
            let prijava = new Prijava(results[0].status_prijava, results[0].ime, results[0].prezime, results[0].datum_i_god_rod, 
                results[0].email, results[0].br_tel, results[0].br_tel_odg_osobe, results[0].motivacijsko_pismo, 
                results[0].status_korisnik, results[0].datum_odrzavanja_kamp, results[0].ime_kamp);
            
            prijava.id_prijava = results[0].id_prijava;
            prijava.datum_i_vrijeme_prijava = results[0].datum_i_vrijeme_prijava;
        }         
        return prijava;
    }

    static async changeStatusPrijava(id, status){
        return await dbChangeStatusPrijava(id,status);
    }
}

dbGetPrijava = async (id_prijava) => {
    const sql = `SELECT id_prijava, status_prijava, ime, prezime, datum_i_god_rod, email,
                br_tel, br_tel_odg_osobe, motivacijsko_pismo, status_korisnik, datum_i_vrijeme_prijava, datum_odrzavanja_kamp, ime_kamp
	            FROM prijava WHERE id_prijava = $1`;
    try{
        const result = await db.query(sql, [id_prijava]);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


dbAddNewPrijava = async (prijava) => {
    const sql = `INSERT INTO prijava (status_prijava, ime, prezime, datum_i_god_rod, email, 
        br_tel, br_tel_odg_osobe, motivacijsko_pismo, status_korisnik, datum_odrzavanja_kamp, ime_kamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_prijava`;
    try {
        const result = await db.query(sql, [prijava.status_prijava, prijava.ime, prijava.prezime, prijava.datum_i_god_rod, 
            prijava.email, prijava.br_tel, prijava.br_tel_odg_osobe, prijava.motivacijsko_pismo,
            prijava.status_korisnik, prijava.datum_odrzavanja_kamp, prijava.ime_kamp]);
        return result.rows[0].id_prijava;
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}

// ovdje su dobro iskoristeni argumenti
dbCheckExistingPrijava= async (ime, prezime) => {
    const sql = `SELECT id_prijava FROM prijava WHERE ime = $1 AND prezime = $2`;
    try {
        const result = await db.query(sql, [ime, prezime]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Dohvatiti sve podatke o prijavi i u pozivajućoj metodi stvoriti nove instance prijave
dbFetchActivePrijava = async() => {
    const sql = `SELECT id_prijava, status_prijava, ime, prezime, status_korisnik, datum_i_vrijeme_prijava, 
                motivacijsko_pismo, datum_odrzavanja_kamp, ime_kamp
                FROM prijava WHERE status_prijava = $1`;
    try{
        const result = await db.query(sql, ["neobrađena"]);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


// Popraviti modificiranje upita. Za referencu pogledati druge upite npr. gornji upiti
// Ovakav unos teksta omogućuje SQL injection
dbChangeStatusPrijava = async(id, status) => {
    const sql = 'UPDATE PRIJAVA SET status_prijava = $2 WHERE id_prijava = $1';
    try{
        const result = await db.query(sql, [id, status]);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}