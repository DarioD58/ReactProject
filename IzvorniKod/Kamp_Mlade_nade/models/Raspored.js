// JavaScript Document

const db = require('../db');


module.exports = class Raspored {
    //konstruktor
    constructor(id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator){
        this.id_grupa = id_grupa;   // number
        this.id_aktivnost = id_aktivnost;     // number
        this.datum_i_vrijeme = datum_i_vrijeme;   // Date
        this.korisnicko_ime_animator = korisnicko_ime_animator;  // string
    }   
	
	// implementacija generičkih funkcionalnost za dohvat, uređivanje, brisanje...
	async addToRaspored() {
        try {
            let idAktivnosti = await dbAddNewKorisnik(this);
            this.id_aktivnost = idAktivnosti;
            return this.idAktivnosti;
        } catch(err) {
			console.log(err);
            throw err;
        }
    }
	
	async updateInRaspored(id_aktivnost){
		dbUpdateInRaspored (this.id_grupa, id_aktivnost,this.datum_i_vrijeme, this.korisnicko_ime_animator);
	}
	
	async deleteFromRaspored(id_aktivnost){
		dbDeleteFromRaspored(id_aktivnost);
	}
	
	async deleteteRaspored(){
		dbDeleteRaspored();
	}
}
	
 
dbAddToRaspored = async (aktivnost) => {
    const sql = `INSERT INTO raspored (id_aktivnost,id_grupa, datum_i_vrijeme, korisnicko_ime_animator)
     VALUES ($1, $2, $3, $4) RETURNING id_aktivnost`;
    try {
        console.log("Dodajem novu aktivnost");
        const result = await db.query(sql, [aktivnost.id_aktivnost,aktivnost.id_grupa, aktivnost.datum_i_vrijeme, aktivnost.korisnicko_ime_animator]);
        return result.rows[0].id_aktivnost;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbUpdateInRaspored = async (id_grupa, id_aktivnost, datum_i_vrijeme, korisnicko_ime_animator) => {
	const sql = `UPDATE raspored SET id_grupa = $1, datum_i_vrijeme = $2, korisnicko_ime_animator = '$3' 
		WHERE id_aktivnost = $5`;
	 try {
        const result = await db.query(sql, korisnicko_ime);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }

}

dbDeleteFromRaspored = async (id_aktivnost) => {
    const sql = `DELETE FROM raspored WHERE id_aktivnost = $1`;
    try {
        const result = await db.query(sql, id_aktivnost);
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbDeleteRaspored = async () =>{
	const sql = `TRUNCATE TABLE raspored`;
	try {
        const result = await db.query(sql, id_aktivnost);
    } catch (err) {
        console.log(err);
        throw err
	}
}