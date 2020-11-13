const db = require('../db');
const Korisnik = require('../models/Korisnik');

// razred Organizator - predstavlja organizatora kampa - admin
module.exports = class Organizator extends Korisnik {
    
    // konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
    }

    //implementacije funkcija
    // vraca String
    async addNewOrganizator() {
        return await dbAddNewOrganizator(this);
    }
    
    // vraca Organizator
    static async fetchOrganizatorkByUsername(username){
        let korisnik = await Korisnik.fetchKorisnikByUsername(username);
        return new Organizator(korisnik.korisnicko_ime, korisnik.lozinka, korisnik.email, korisnik.ime, korisnik.prezime, korisnik.status);
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