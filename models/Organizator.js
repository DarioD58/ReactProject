const db = require('../db');
const Korisnik = require('../models/Korisnik');

// razred Organizator - predstavlja organizatora kampa - admin
module.exports = class Organizator extends Korisnik {
    
    // konstruktor
    constructor(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status){
        super(korisnicko_ime, lozinka, ime, prezime, datum_i_god_rod, email, br_tel, status);
    }

    //implementacije funkcija
    // vraca String
    async addNewOrganizator() {
        return await dbAddNewOrganizator(this);
    }
    
    // vraca Organizator
    static async fetchOrganizatorkByUsername(username){
        let korisnik = await Korisnik.fetchKorisnikByUsername(username);
        return new Organizator(korisnik.korisnicko_ime, korisnik.lozinka, korisnik.ime, 
            korisnik.prezime, korisnik.datum_i_god_rod, korisnik.email, korisnik.br_tel, korisnik.status);
    }   

    static async checkOrganizator(username, status){
        if(status != 'organizator') return false;

        let organizator = await this.fetchOrganizatorkByUsername(username);
        if(organizator.korisnicko_ime != username) return false;

        return true;
    }

}

//implementacije funkcija
dbAddNewOrganizator = async (organizator) => {
    const sql = "INSERT INTO organizator (korisnicko_ime_organizator) VALUES ($1) RETURNING korisnicko_ime_organizator";
    try {
        await organizator.addNewKorisnik();
        const result = await db.query(sql, [organizator.korisnicko_ime]);
        return result.rows[0].korisnicko_ime_organizator;
    } catch (error) {
        console.log(err);
        throw err
    }
}