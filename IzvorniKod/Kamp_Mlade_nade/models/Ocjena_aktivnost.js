const db = require('../db');

module.exports = class Ocjena_aktivnost {

    constructor(ocjena, dojam, id_aktivnost, korisnicko_ime){
        this.ocjena = ocjena; // Number
        this.dojam = dojam; // String
        this.id_aktivnost = id_aktivnost; // Number
        this.korisnicko_ime = korisnicko_ime;  // String
    }


    // metoda za unos ocjene aktivnosti
    // Poziva se nad instancom razreda Ocjena_aktivnost
    async addNewOcjenaAktivnost(){
        await dbAddNewOcjenaAktivnost(this);
    }

    static async fetchOcjenaKorisnik(korisnicko_ime){
        let results = await dbGetOcjenaKorisnik(korisnicko_ime);
        let ocjene = [];
        let ocjena;

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);

                ocjene.push(ocjena);
            }
        }       

        return ocjene;
    }

    async fetchOcjenaGrupa(id_grupa){
        let results = await dbGetOcjenaGrupa(id_grupa);
        let ocjene = [];
        let ocjena;

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);

                ocjene.push(ocjena);
            }
        }       

        return ocjene;
    }

    async fetchOcjenaAktivnost(id_aktivnost){
        let results = await dbGetOcjenaAktivnost(id_aktivnost);
        let ocjene = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);

                ocjene.push(ocjena);
            }
        }  

        return ocjene;
    }
}

dbAddNewOcjenaAktivnost = async (ocjena_aktivnost) => {
    const sql = `INSERT INTO ocjena_aktivnost(ocjena, dojam, id_aktivnost, korisnicko_ime)
        VALUES ($1, $2, $3, $4);`;
    try {
        const result = await db.query(sql, [ocjena_aktivnost.ocjena, ocjena_aktivnost.dojam,
                    ocjena_aktivnost.id_aktivnost, ocjena_aktivnost.korisnicko_ime]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaKorisnik = async(korisnicko_ime) =>{
    const sql = `SELECT *
                FROM ocjena_aktivnost 
                WHERE korisnicko_ime = $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaGrupa = async(id_grupa) =>{
    const sql = `SELECT *
                FROM ocjena_aktivnost JOIN sudionik ON korisnicko_ime_sudionik = korisnicko_ime 
                WHERE id_grupa = $1`;
    try {
        const result = await db.query(sql, [id_grupa]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaAktivnost = async (id_aktivnost) => {
    const sql = `SELECT *
                FROM ocjena_aktivnost 
                WHERE id_aktivnost = $1`;
    try {
        const result = await db.query(sql, [id_aktivnost]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


