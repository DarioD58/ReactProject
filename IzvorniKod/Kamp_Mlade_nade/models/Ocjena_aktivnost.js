const db = require('../db');

module.exports = class Ocjena_aktivnost {

    constructor(ocjena, dojam, id_aktivnost, korisnicko_ime){
        this.ocjena = ocjena; // Number
        this.dojam = dojam; // String
        this.id_aktivnost = id_aktivnost; // Number
        this.korisnicko_ime = korisnicko_ime;  // String
    }


    // metoda za unos ocjene aktivnosti
    // Poziva se nad instancom razreda Ocjena_aktivnost
    async addNewOcjenaAktivnost(){
        try {
            let ocjena = await dbAddNewOcjenaAktivnost(this);
            this.ocjena = ocjena;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
    //metoda za unos dojma o aktivnosti
    async addNewDojamAktivnost(){
        try {
            let dojam = await dbAddNewDojamAktivnost(this);
            this.dojam = dojam;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
}

dbAddNewOcjenaAktivnost = async (ocjena) => {
    const sql = 'INSERT INTO sudionik_ocjena_aktivnosti(korisnicko_ime_sudionik, ocjena_sudionik) VALUES (' + this.korisnicko_ime + ',' + ocjena + ')';
    try {
        const result = await db.query(sql, [ocjena]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

dbAddNewDojamAktivnost = async (dojam) => {
    const sql = 'INSERT INTO sudionik_ocjena_aktivnosti(korisnicko_ime_sudionik, dojam_sudionik) VALUES (' + this.korisnicko_ime + ',' + dojam + ')';
    try {
        const result = await db.query(sql, [dojam]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}