const db = require('../db');

// razred Kamp - modelira jedan kamp kojim se upravlja

module.exports = class Kamp {

    // konstruktor
    constructor(ime_kamp, datum_odrzavanja_kamp, trajanje, pocetak_prijava_sudionika,
        kraj_prijava_sudionika, pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa, status, email_kamp){
            this.ime_kamp = ime_kamp;   // string
            this.datum_odrzavanja_kamp = datum_odrzavanja_kamp; // Date
            this.trajanje = trajanje; // number
            this.pocetak_prijava_sudionika = pocetak_prijava_sudionika; // Date
            this.kraj_prijava_sudionika = kraj_prijava_sudionika;   // Date
            this.pocetak_prijava_animatora = pocetak_prijava_animatora; // Date
            this.kraj_prijava_animatora = kraj_prijava_animatora;   // Date
            this.broj_grupa = broj_grupa;   // number
            this.status = status;   // number
            this.email_kamp = email_kamp;   // string
        }

        /* Iz baze dohvaća kamp (ili kampove)
            čiji je status=1 (aktivan kamp),
            ako takav ne postoji, vraća kamp
            čiji je početak najbliži trenutnom datumu
        */

        async createKamp(){
            return await dbCreateKamp(this);
        }

        async updateStatusKamp(status){
            await dbUpdateStatusKamp(status, this.ime_kamp, this.datum_odrzavanja_kamp);
        }

        async checkForSudionikPrijave(){
            return await dbCheckForSudionikPrijave(this);
        }
        
        async checkForAnimatorPrijave(){
            return await dbCheckForAnimatorPrijave(this);
        }

        // vraca Kamp
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

        // vraca Kamp
        static async fetchUpcoming(){
            let results = await dbGetUpcomingCamp();
            let kamp = new Kamp();

            if(results.length > 0 ){
                kamp = new Kamp(results[0].ime_kamp, results[0].datum_odrzavanja_kamp, 
                    results[0].trajanje_d, results[0].pocetak_prijava_sudionika, results[0].kraj_prijava_sudionika, 
                    results[0].pocetak_prijava_animatora, results[0].kraj_prijava_animatora, results[0].broj_grupa,
                    results[0].status, results[0].email_kamp);
            }

            return kamp;
        }

        // vraca Kamp
        static async checkForActiveCamp(){
            let results = await dbCheckForActiveCamp();
            let kamp = new Kamp();

            if(results.length > 0 ){
                kamp = new Kamp(results[0].ime_kamp, results[0].datum_odrzavanja_kamp, 
                    results[0].trajanje_d, results[0].pocetak_prijava_sudionika, results[0].kraj_prijava_sudionika, 
                    results[0].pocetak_prijava_animatora, results[0].kraj_prijava_animatora, results[0].broj_grupa,
                    results[0].status, results[0].email_kamp);
            }

            return kamp;
        }

        // vraca Kamp[]
        //vraca Kamp
        static async fetchByNameAndDate(){
            let results = await dbFetchByNameAndDate();
            let kamp = new Kamp();

            if(results.length > 0){
                kamp = new Kamp(results[0].ime_kamp, results[0].datum_odrzavanja_kamp, 
                    results[0].trajanje_d, results[0].pocetak_prijava_sudionika, results[0].kraj_prijava_sudionika, 
                    results[0].pocetak_prijava_animatora, results[0].kraj_prijava_animatora, results[0].broj_grupa,
                    results[0].status, results[0].email_kamp); 
            }
            return kamp;
        }

        //brisanje kampa
        static async eraseCamp(){
            return await dbEraseCamp(this);
        }

}

dbCheckForSudionikPrijave = async (kamp) => {
    const sql = `SELECT COUNT(*)
    FROM kamp
    WHERE pocetak_prijava_sudionika <= CURRENT_TIMESTAMP(0) AND kraj_prijava_sudionika >= CURRENT_TIMESTAMP(0)
            AND ime_kamp = $1 AND datum_odrzavanja_kamp = $2`;  
    try {
        const result = await db.query(sql, [kamp.ime_kamp, kamp.datum_odrzavanja_kamp]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbCheckForAnimatorPrijave = async (kamp) => {
    const sql = `SELECT COUNT(*)
    FROM kamp
    WHERE pocetak_prijava_animatora <= CURRENT_TIMESTAMP(0) AND kraj_prijava_animatora >= CURRENT_TIMESTAMP(0)
            AND ime_kamp = $1 AND datum_odrzavanja_kamp = $2`;  
    try {
        const result = await db.query(sql, [kamp.ime_kamp, kamp.datum_odrzavanja_kamp]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbCreateKamp = async(kamp) => {
    const sql = `INSERT INTO KAMP (ime_kamp, datum_odrzavanja_kamp, 
        trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
        pocetak_prijava_animatora, kraj_prijava_animatora, status, 
        broj_grupa, email_kamp)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

    try {
        const result = await db.query(sql, [kamp.ime_kamp, kamp.datum_odrzavanja_kamp, kamp.trajanje, kamp.pocetak_prijava_sudionika,
        kamp.kraj_prijava_sudionika, kamp.pocetak_prijava_animatora, kamp.kraj_prijava_animatora, kamp.status, kamp.broj_grupa, kamp.email_kamp]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
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
        throw err;
    }
};

dbGetUpcomingCamp = async () => {
    const sql = `SELECT ime_kamp, datum_odrzavanja_kamp, 
    trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
    pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa,
    status, email_kamp
    FROM kamp WHERE datum_odrzavanja_kamp = (SELECT MIN(datum_odrzavanja_kamp) FROM kamp WHERE datum_odrzavanja_kamp > CURRENT_TIMESTAMP(0))`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

dbFetchByNameAndDate = async(ime_kamp, datum_odrzavanja) => {
    const sql = `SELECT ime_kamp, datum_odrzavanja_kamp, 
    trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
    pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa,
    status, email_kamp
    FROM kamp WHERE ime_kamp =` + ime_kamp + 'AND datum_odrzavanja_kamp =' + datum_odrzavanja_kamp;
    try {
        const result = await db.query(sql, [ime_kamp, datum_odrzavanja]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } 

};

dbUpdateStatusKamp = async(status, ime_kamp, datum_odrzavanja_kamp) => {
    const sql = `UPDATE kamp SET status = $1
	    WHERE ime_kamp = $2 AND datum_odrzavanja_kamp = $3`;
    try {
        const result = await db.query(sql, [status, ime_kamp, datum_odrzavanja_kamp]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbCheckForActiveCamp = async() => {
    const sql = `SELECT ime_kamp, datum_odrzavanja_kamp, 
    trajanje_d, pocetak_prijava_sudionika, kraj_prijava_sudionika, 
    pocetak_prijava_animatora, kraj_prijava_animatora, broj_grupa,
    status, email_kamp
    FROM kamp
    WHERE datum_odrzavanja_kamp <= CURRENT_TIMESTAMP(0) AND (datum_odrzavanja_kamp + (trajanje_d * interval '1 day')) >= CURRENT_TIMESTAMP(0)`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbEraseCamp = async(ime_kamp, datum_odrzavanja_kamp) => {
    const sql = 'DELETE * FROM KAMP WHERE ime_kamp =' + ime_kamp + ' AND datum_odrzavanja_kamp =' + datum_odrzavanja_kamp;
    try{
        const result = await db.query(sql, [ime_kamp, datum_odrzavanja_kamp]);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}