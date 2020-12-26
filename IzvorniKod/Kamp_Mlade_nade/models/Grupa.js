const db = require('../db');
const Sudionik = require('../models/Sudionik');

module.exports = class Grupa {
    //konstruktor
    constructor(ime_grupa){
        this.id_grupa = undefined;   // number
        this.ime_grupa = ime_grupa;   // string
    }

    // implementacija generičkih funkcionalnost za dohvat, uređivanje, brisanje...

    // dohvaća sve grupe
    static async fetchAllGrupa(){

    }

    // dohvaća sve članove grupe jedne grupe: iz tablice sudionik i grupa spojiti po id_grupa
    async getAllMembers(){

    }


    // metoda za razvrstavanje sudionika u željeni broj grupa
    static async createGroups(brojGrupa){
        // u petlji napraviti traženi broj grupa i dodavati jednu po jednu u bazu
        
        // podijeliti sudionike po grupama tako da broj sudionika u grupi bude podjednak
    }

}

dbGetAllGrupa = async () => {

}

dbGetAllMembers = async () => {

}