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
        static async fetchAll(kamp){

            let results = await dbGetAll(kamp.ime_kamp, kamp.datum_odrzavanja_kamp);
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
        



}

dbAddNewAktivnost = async (aktivnost) =>  {


};

dbGetAll = async (ime_kamp, datum_odrzavanja_kamp) => {
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

dbAddNewAktivnost = async () =>{


}
