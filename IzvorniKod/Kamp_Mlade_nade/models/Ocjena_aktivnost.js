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
        try {
            let ocjena = await dbAddNewOcjenaAktivnost(this);
            this.ocjena = ocjena;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
    //metoda za unos dojma o aktivnosti
    async addNewDojamAktivnost(){
        try {
            let dojam = await dbAddNewDojamAktivnost(this);
            this.dojam = dojam;
        } catch(err){
            console.log(err);
            throw err;
        }
    }

    static async fetchOcjenaKorisnik(korisnicko_ime){
        let results = await dbGetOcjenaKorisnik(korisnicko_ime);
        let ocjene = [];

         if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);
                
                this.korisnicko_ime = results[i].korisnicko_ime;
                ocjene.push(ocjena);
            }
        }       
        return ocjene;
    }

    async fetchOcjenaGrupa(){
        let results = await dbGetOcjenaGrupa(this.id_grupa);
        let ocjene = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);
                
                this.id_grupa = results[i].id_grupa;
                ocjene.push(ocjena);
            }
        }       
        return ocjene;
    }

    async fetchOcjenaAcitvities(id_aktivnost){
        let results = await dbGetOcjenaAcitvities(id_aktivnost);
        let ocjene = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let ocjena = new Ocjena_aktivnost(results[i].ocjena, results[i].dojam,
                    results[i].id_aktivnost, results[i].korisnicko_ime);
                
                this.id_aktivnost = results[i].id_aktivnost;
                ocjene.push(ocjena);
            }
        }       
        return ocjene;
    }
}

dbAddNewOcjenaAktivnost = async (ocjena) => {
    const sql = 'INSERT INTO sudionik_ocjena_aktivnosti(korisnicko_ime_sudionik, ocjena_sudionik) VALUES (' + this.korisnicko_ime + ',' + ocjena + ')';
    try {
        const result = await db.query(sql, [ocjena]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

dbAddNewDojamAktivnost = async (dojam) => {
    const sql = 'INSERT INTO sudionik_ocjena_aktivnosti(korisnicko_ime_sudionik, dojam_sudionik) VALUES (' + this.korisnicko_ime + ',' + dojam + ')';
    try {
        const result = await db.query(sql, [dojam]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaKorisnik = async(korisnicko_ime) =>{
    const sql = `SELECT ocjena, dojam, id_aktivnost
    FROM Ocjena_aktivnost WHERE korisnicko_ime LIKE '$1'`;
    try {
        const result = await db.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaGrupa = async(id_grupa) =>{
    const sql = `SELECT ocjena, dojam, id_aktivnost, korisnicko_ime
    FROM Ocjena_aktivnost JOIN korisnik ON korisnicko_ime_sudionik=korisnicko_ime 
    NATURAL JOIN raspored WHERE raspored.id_grupa = $1`;
    try {
        const result = await db.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetOcjenaAcitvities = async (id_aktivnost) => {
    const sql = `SELECT ime_aktivnost, ocjena, dojam, id_aktivnost, korisnicko_ime
    FROM Ocjena_aktivnost WHERE id_aktivnost LIKE $1`;
    try {
        const result = await db.query(sql, [id_grupa]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


