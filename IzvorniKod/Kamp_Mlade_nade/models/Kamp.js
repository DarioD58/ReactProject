const db = require('../db');

// razred Kamp - modelira jedan kamp kojim se upravlja

module.exports = class Kamp {

    // konstruktor
    constructor(ime_kamp, datum_odrzavanja, trajanje, pocetak_prijava_sudionika,
        kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora){
            this.ime_kamp = ime_kamp;
            this.datum_odrzavanja = datum_odrzavanja;
            this.trajanje = trajanje;
            this.pocetak_prijava_sudionika = pocetak_prijava_sudionika;
            this.kraj_prijava_sudionika = kraj_prijava_sudionika;
            this.pocetak_prijava_animatora = pocetak_prijava_animatora;
            this.kraj_prijava_animatora = kraj_prijava_animatora;
            this.broj_grupa = undefined;
        }

        /* Iz baze dohvaća kamp (ili kampove)
            čiji je status=1 (aktivan kamp),
            ako takav ne postoji, vraća kamp
            čiji je početak najbliži trenutnom datumu
        */
        static async fetchActiveOrUpcoming(){

        }
}