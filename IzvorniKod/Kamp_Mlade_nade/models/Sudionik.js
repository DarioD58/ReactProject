const db = require('../db');
const Korisnik = require('../models/Korisnik');

//razred Sudionik - predstavlja jednog sudionika kampa
module.exports = class Sudionik extends Korisnik {

    //konstruktor
    constructor(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status, br_tel_odg_osobe){
        super(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status);
        this.br_tel_odg_osobe = br_tel_odg_osobe;   // String
        this.id_grupa = undefined;  // Number
    }
    //implementacije funkcija

    // vraca String
    async addNewSudionik() {
        return await dbAddNewSudionik(this);
    }

    async fetchSudionkAnimators(){
        let results = await dbGetSudionikAnimators(this.id_grupa);
        let animatori = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let animator = new Animator(results[i].korisnicko_ime, results[i].lozinka, results[i].email, results[i].ime,
                                                results[i].prezime, results[i].status, results[i].br_tel, 
                                                results[i].datum_i_god_rod);

                animatori.push(animator);
            }
        }         
        return animatori;
    }

    // vraca Aktivnost[]
    async fetchSudionikAcitvities(){
        let results = await dbGetSudionikAcitvities(this.id_grupa);
        let aktivnosti = [];

        if( results.length > 0 ) {
            for(let i = 0; i < results.length; i++){
                let aktivnost = new Aktivnost(results[i].ime_aktivnost, results[i].opis_aktivnost,
                                            results[i].trajanje_aktivnost_h, results[i].tip_aktivnost, 
                                            results[i].datum_odrzavanja_kamp, results[i].ime_kamp);
                
                aktivnost.id_aktivnost = results[i].id_aktivnost;
                aktivnosti.push(aktivnost);
            }
        }       
        return aktivnosti;
    }

    // vraca Sudionik
    static async fetchSudionikByUsername(korisnicko_ime){
        let results = await dbGetSudionikByUsername(korisnicko_ime);
        let sudionik;

        if( results.length > 0 ) {
            sudionik = new Sudionik(results[0].korisnicko_ime, results[0].lozinka, results[0].ime, 
                                    results[0].prezime, results[0].datum_i_god_rod, results[0].email, 
                                    results[0].br_tel, results[0].status, results[0].br_tel_odg_osobe);

            sudionik.id_grupa = results[0].id_grupa;
        }
        return sudionik;
    }
	
    //dohvati sve
    static async fetchAllSudionik(){
            let results = await dbSudionikGetAll();
            let sudionici = [];

            if( results.length > 0 ) {
                for(let i = 0; i < results.length; i++){
                    sudionik = new Sudionik(results[i].korisnicko_ime, results[i].lozinka, results[i].ime, 
                                        results[i].prezime, results[i].datum_i_god_rod, results[i].email, 
                                        results[i].br_tel, results[i].status, results[i].br_tel_odg_osobe);

                    sudionik.id_grupa = results[i].id_grupa;
                    sudionici.push(sudionik);
                }
            }         
            return sudionici;
    }

    //metoda za izmjenu grupe sudionika
    async changeSudionikGroup (korisnicko_ime_sudionik){
        dbChangeSudionikGroup (korisnicko_ime_sudionik, id_grupa);
    }

    
}
//implementacije funkcija
dbGetSudionikByUsername = async (korisnicko_ime) => {
    const sql = `SELECT korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status, br_tel_odg_osobe, id_grupa
    FROM sudionik JOIN korisnik ON korisnicko_ime_sudionik = korisnicko_ime WHERE korisnicko_ime = $1`;
    try {
        const result = await db.query(sql, [korisnicko_ime]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbAddNewSudionik = async (sudionik) => {
    const sql = `INSERT INTO sudionik (korisnicko_ime_sudionik, br_tel_odg_osobe)
     VALUES ($1, $2) RETURNING korisnicko_ime_sudionik`;
    try {
        await sudionik.addNewKorisnik();
        //console.log("Dodajem novog sudionika")
        const result = await db.query(sql, [sudionik.korisnicko_ime, sudionik.br_tel, 
            sudionik.datum_i_god_rod, sudionik.br_tel_odg_osobe]);
        return result.rows[0].korisnicko_ime_sudionik;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbSudionikGetAll = async() =>{
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status,
    br_tel_sudionik, datum_i_god_rod_sudionik, br_tel_odg_osobe, id_grupa
    FROM sudionik JOIN korisnik ON korisnicko_ime_sudionik = korisnicko_ime`;
    try {
        const result = await db.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetSudionikAnimators = async (id_grupa) => {
    const sql = `SELECT korisnicko_ime, lozinka, email, ime, prezime, status,
    br_tel_animator, datum_i_god_rod_animator
    FROM animator JOIN korisnik ON korisnicko_ime_animator = korisnicko_ime NATURAL JOIN raspored
    WHERE raspored.id_grupa = $1`;
    try {
        const result = await db.query(sql, [id_grupa]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbGetSudionikAcitvities = async (id_grupa) => {
    const sql = `SELECT aktivnost.id_aktivnost, ime_aktivnost, opis_aktivnost, trajanje_aktivnost_h, tip_aktivnost, ime_kamp, datum_odrzavanja_kamp
    FROM raspored NATURAL JOIN aktivnost NATURAL JOIN animator WHERE id_grupa LIKE $1`;
    try {
        const result = await db.query(sql, [id_grupa]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

dbChangeSudionikGroup = async (korisnicko_ime_sudionik, id_grupa) => {
    const sql = 'UPDATE SUDIONIK SET id_grupa = $1 WHERE korisnicko_ime_sudionik = $2';
    try {
        const result = await db.query(sql, [id_grupa, korisnicko_ime_sudionik]);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}