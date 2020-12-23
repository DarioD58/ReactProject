const db = require('../db');


module.exports = class Raspored {
    //konstruktor
    constructor(id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator){
        this.id_grupa = id_grupa;   // number
        this.id_aktivnost = id_aktivnost;     // number
        this.datum_i_vrijeme = datum_i_vrijeme;   // Date
        this.korisnicko_ime_animator = korisnicko_ime_animator;  // string
    }   
}