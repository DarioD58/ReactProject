const db = require('../db');


// razred Prijava - predstavlja prijavu jednog sudionika ili 
// animatora na kamp

module.exports = class Prijava {

    // konstruktor
    constructor(korisnik, motivacijsko_pismo, status_prijava, kamp){
        this.korisnik = korisnik;
        this.motivacijsko_pismo = motivacijsko_pismo;
        this.status_prijava = status_prijava;
        this.kamp = kamp;
    }

    async addNewPrijava() {
        return await dbAddNewPrijava(this);
    }
}

dbAddNewPrijava = async (prijava) => {
    const sql = "INSERT INTO prijava (korisnicko_ime, status_prijava, "+
    "ime_kamp, datum_odrzavanja_kamp, motivacijsko_pismo) VALUES ('" +
    prijava.korisnik.korisnicko_ime + "', '" + prijava.status_prijava + "', '" + 
    prijava.kamp.ime_kamp + "', '" + prijava.kamp.datum_odrzavanja_kamp + "', '" + prijava.motivacijsko_pismo + "') RETURNING id_prijava";
    try {
        const result = await db.query(sql, []);
        return result.rows[0].id_prijava;
    } catch (err) {
        console.log(err);
        throw err;
    }
}