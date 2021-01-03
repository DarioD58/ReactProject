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

    // metoda za unos ukupnog dojma
    // Poziva se nad instancom razreda Ukupni_dojam
    async addNewUkupniDojam(){
        try {
            let dojam = await dbAddNewUkupniDojam(this);
            this.dojam = dojam;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
}


dbAddNewUkupniDojam = async (dojam) => {
    const sql = 'INSERT INTO ukupni_dojam(korisnicko_ime, dojam) VALUES (' + this.korisnicko_ime + ',' + dojam + ')';
    try {
        const result = await db.query(sql, [dojam]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

