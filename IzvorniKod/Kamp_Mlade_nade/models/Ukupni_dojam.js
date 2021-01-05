const db = require('../db');

module.exports = class Ukupni_dojam {

    // konstruktor
    constructor(ocjena, dojam, korisnicko_ime, datum_odrzavanja_kamp, ime_kamp){
        this.ocjena = ocjena; // Number
        this.dojam = dojam; // String
        this.korisnicko_ime = korisnicko_ime;  // String    
        this.datum_odrzavanja_kamp = datum_odrzavanja_kamp; // Date
        this.ime_kamp = ime_kamp;   // String
    }

    async addNewUkupniDojam(){
        await dbAddNewUkupniDojam(this);
    }


}

dbAddNewUkupniDojam = async (ukupni_dojam) => {
    const sql = `INSERT INTO ukupni_dojam (ocjena, dojam, korisnicko_ime, datum_odrzavanja_kamp, ime_kamp)
        VALUES ($1, $2, $3, $4, $5)`;
    try {
        const result = await db.query(sql, [ukupni_dojam.ocjena, ukupni_dojam.dojam, ukupni_dojam.korisnicko_ime,
                        ukupni_dojam.datum_odrzavanja_kamp, ukupni_dojam.ime_kamp]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}


