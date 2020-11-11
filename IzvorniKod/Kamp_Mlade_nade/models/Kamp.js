const db = require('../db');

// razred Kamp - modelira jedan kamp kojim se upravlja

module.exports = class Kamp {

    // konstruktor
    constructor(ime_kamp, datum_odrzavanja_kamp, trajanje, pocetak_prijava_sudionika,
        kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa, status, email_kamp){
            this.ime_kamp = ime_kamp;
            this.datum_odrzavanja = datum_odrzavanja_kamp;
            this.trajanje = trajanje;
            this.pocetak_prijava_sudionika = pocetak_prijava_sudionika;
            this.kraj_prijava_sudionika = kraj_prijava_sudionika;
            this.pocetak_prijava_animatora = pocetak_prijava_animatora;
            this.kraj_prijava_animatora = kraj_prijava_animatora;
            this.broj_grupa = broj_grupa;
            this.status = status;
            this.email_kamp = email_kamp;
        }

        /* Iz baze dohvaća kamp (ili kampove)
            čiji je status=1 (aktivan kamp),
            ako takav ne postoji, vraća kamp
            čiji je početak najbliži trenutnom datumu
        */
        static async fetchActive(){

            let results = await dbGetActiveCamp();
            let kamp = new Kamp();

            if( results.length > 0 ) {
                kamp = new Kamp(results[0].ime_kamp, results[0].datum_odrzavanja_kamp, 
                    results[0].trajanje_d, results[0].pocetak_prijava_sudionika, results[0].kraj_prijava_sudionika, 
                    results[0].pocetak_prijava_animatora, results[0].kraj_prijava_animatora, results[0].broj_grupa,
                    results[0].status, results[0].email_kamp);
            }
            return kamp;
        }

        static async fetchUpcoming(){
            results = await dbGetUpcomingCamp();
            let kamp = new Kamp();

            if(results.length > 0 ){
                kamp = new Kamp(results[0].ime_kamp, results[0].datum_odrzavanja_kamp, 
                    results[0].trajanje_d, results[0].pocetak_prijava_sudionika, results[0].kraj_prijava_sudionika, 
                    results[0].pocetak_prijava_animatora, results[0].kraj_prijava_animatora, results[0].broj_grupa,
                    results[0].status, results[0].email_kamp);
            }

            return kamp
        }

}

dbGetActiveCamp = async () => {
    const sql = `SELECT ime_kamp, datum_odrzavanja_kamp, 
    trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
    pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa,
    status, email_kamp FROM kamp WHERE status = 1`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbGetUpcomingCamp = async () => {
    const sql = `SELECT ime_kamp, datum_odrzavanja_kamp, 
    trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
    pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa,
    status, email_kamp
    FROM kamp WHERE datum_odrzavanja_kamp - '`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};