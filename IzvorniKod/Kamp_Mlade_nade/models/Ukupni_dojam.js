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

    }
    
}