const db = require('../db');
const Kamp = require('./Kamp');

// razred aktivnost - modelira jednu aktivnost kampa

module.exports = class Aktivnost {
        constructor(ime_aktivnost, opis_aktivnost,
            trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp) {
            this.id_aktivnost = undefined;  // number
            this.ime_aktivnost = ime_aktivnost;   // string
            this.opis_aktivnost = opis_aktivnost;   // string
            this.trajanje_aktivnost_h = trajanje_aktivnost_h;   // number
            this.tip_aktivnost = tip_aktivnost; // string
            this.datum_odrzavanja_kamp = datum_odrzavanja_kamp;
            this.ime_kamp = ime_kamp; // Kamp
        }

        // vraća tip Number
        // metda dbAddNewAktivnost() nije napravljena!
        async addNewAktivnost(){
            this.id_aktivnost = await dbAddNewAktivnost(this);
            return this.id_aktivnost;
        }

        static async fetchAktivnostByName(ime_aktivnost, ime_kamp, datum_odrzavanja_kamp){
            let results = await dbGetAktivnostByName(ime_aktivnost, ime_kamp, datum_odrzavanja_kamp);
            let aktivnost = undefined;
    
            if( results.length > 0 ) {
                aktivnost = new Aktivnost(results[0].ime_aktivnost, results[0].opis_aktivnost,
                    results[0].trajanje_aktivnost_h, results[0].tip_aktivnost, results[0].datum_odrzavanja_kamp, results[0].ime_kamp);
                
                aktivnost.id_aktivnost = results[0].id_aktivnost;
            }       
            return aktivnost;
        }
        
        static async fetchAktivnostById(id_aktivnost){
            let results = await dbGetAktivnostById(id_aktivnost);
            let aktivnost = undefined;
    
            if( results.length > 0 ) {
                aktivnost = new Aktivnost(results[0].ime_aktivnost, results[0].opis_aktivnost,
                    results[0].trajanje_aktivnost_h, results[0].tip_aktivnost, results[0].datum_odrzavanja_kamp, results[0].ime_kamp);
                
                aktivnost.id_aktivnost = results[0].id_aktivnost;
            }       
            return aktivnost;
        }
 
           
        

        // vraća tip Aktivnost[]
        static async fetchAllAktivnost(kamp){
            let results = await dbGetAllAktivnosti(kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
            let aktivnosti = [];

            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    let aktivnost = new Aktivnost(results[i].ime_aktivnost, results[i].opis_aktivnost,
                        results[i].trajanje_aktivnost_h, results[i].tip_aktivnost, results[i].datum_odrzavanja_kamp, results[i].ime_kamp);
                    
                    this.id_aktivnost = results[i].id_aktivnost;
                    aktivnosti.push(aktivnost);
                }
            }       
            return aktivnosti;
        }
        
        //update
        async updateAktivnost(ime_aktivnost){
            dbUpdateAktivnost(ime_aktivnost, this.opis_aktivnost, this.trajanje_aktivnost_h, this.tip_aktivnost,
            this.datum_odrzavanja_kamp, this.ime_kamp);
        }

        //delete
        async removeAktivnost(ime_aktivnost){
		dbDeleteAktivnost(ime_aktivnost);
	}


}

dbGetAktivnostByName = async (ime_aktivnost, ime_kamp, datum_odrzavanja_kamp) => {
    const sql = `SELECT id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM aktivnost WHERE ime_aktivnost LIKE $1 AND ime_kamp LIKE $2 AND datum_odrzavanja_kamp = $3`;
    try {
        const result = await db.query(sql, [ime_aktivnost, ime_kamp, datum_odrzavanja_kamp]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetAktivnostById = async (id_aktivnost) => {
    const sql = `SELECT id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM aktivnost WHERE id_aktivnost = $1`;
    try {
        const result = await db.query(sql, [id_aktivnost]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbAddNewAktivnost = async (aktivnost) =>  {
    const sql = `INSERT INTO aktivnost (ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_aktivnost`;
    try{
        const result = await db.query(sql, [aktivnost.ime_aktivnost, aktivnost.opis_aktivnost, aktivnost.trajanje_aktivnost_h, aktivnost.tip_aktivnost, aktivnost.datum_odrzavanja_kamp, aktivnost.ime_kamp]);
        return result.rows[0].id_aktivnost;
    } catch(err) {
        console.log(err);
        throw err;
    }
};


dbGetAllAktivnosti = async (ime_kamp, datum_odrzavanja_kamp) => {
    const sql = `SELECT id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM aktivnost WHERE ime_kamp LIKE $1 AND datum_odrzavanja_kamp = $2`;
    try {
        const result = await db.query(sql, [ime_kamp, datum_odrzavanja_kamp]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//update aktivnosti
dbUpdateAktivnost = async (ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, datum_odrzavanja_kamp, ime_kamp) => {
	const sql = `UPDATE aktivnost SET ime_aktivnost = $1, opis_aktivnost = $2, trajanje_aktivnost_h = $3,
     tip_aktivnost = $4 WHERE ime_aktivnosti LIKE $1 RETURNING id_aktivnost`;
	 try {
        const result = await db.query(sql, [ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}



dbDeleteAktivnost = async (ime_aktivnost) => {
    const sql = `DELETE FROM aktivnost WHERE ime_aktivnost LIKE $1`;
    try {
		//console.log("Brisem aktivnost")
        const result = await db.query(sql, ime_aktivnost);
    } catch (err) {
        console.log(err);
        throw err
    }
}
