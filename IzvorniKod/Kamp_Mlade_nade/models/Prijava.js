const db = require('../db');


// razred Prijava - predstavlja prijavu jednog sudionika ili 
// animatora na kamp

module.exports = class Prijava {

    // konstruktor
    constructor(korisnik, motivacijsko_pismo, datum_i_vrijeme_prijava, status_prijava, kamp){
        this.korisnik = korisnik;
        this.korisnik = motivacijsko_pismo;
        this.datum_i_vrijeme_prijava = datum_i_vrijeme_prijava;
        this.status_prijava = status_prijava;
        this.kamp = kamp;
    }
}