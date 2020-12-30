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

    }
}