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
        async addNewAktivnost(){
            this.id_aktivnost = await dbAddNewAktivnost(this);
            return this.id_aktivnost;
        }

        // vraća tip Aktivnost[]
        static async fetchAllAktivnost(kamp){
            let results = await dbGetAllAktivnosti(kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
            let aktivnosti = [];

            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    let aktivnost = new Aktivnost(results[i].ime_aktivnost, results[i].opis_aktivnost,
                        results[i].trajanje_aktivnost_h, results[i].tip_aktivnost, kamp.datum_odrzavanja_kamp, kamp.ime_kamp);
                    
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

dbAddNewAktivnost = async (aktivnost) =>  {


};

dbAddNewAktivnost = async () =>{


}

dbGetAllAktivnosti = async (ime_kamp, datum_odrzavanja_kamp) => {
    const sql = `SELECT ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
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
// nije dobro modeliran UPDATE upit! 
dbUpdateAktivnost = async (ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, 
datum_odrzavanja_kamp, ime_kamp) => {
	const sql = `UPDATE aktivnost SET opis_aktivnost, SET trajanje_aktivnost_h,
    SET tip_aktivnost, SET datum_odrzavanja_kamp, SET ime_kamp WHERE ime_aktivnosti LIKE $1`;
	 try {
        const result = await db.query(sql, ime_aktivnost);
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
