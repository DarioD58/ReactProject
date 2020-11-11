const db = require('../db');
const Korisnik = require('../models/Korisnik');

// razred Organizator - predstavlja organizatora kampa - admin
module.exports = class Organizator extends Korisnik{
    
    // konstruktor
    constructor(korisnicko_ime, lozinka, email, ime, prezime, status){
        super(korisnicko_ime, lozinka, email, ime, prezime, status);
    }

    //implementacije funkcija
    async addNewOrganizator() {
        return await dbAddNewOrganizator(this);
    }
        
    static async fetchOrganizatorkByUsername(username){
        return await Korisnik.fetchKorisnikByUsername(username);
    }   

}

//implementacije funkcija
dbAddNewOrganizator = async (organizator) => {
    const sql = "INSERT INTO organizator (korisnicko_ime_organizator) VALUES ('" +
        organizator.korisnicko_ime + "') RETURNING korisnicko_ime_organizator";
    try {
        await organizator.addNewUser();
        const result = await db.query(sql, []);
        return result.rows[0].korisnicko_ime_organizator;
    } catch (error) {
        console.log(err);
        throw err
    }
}