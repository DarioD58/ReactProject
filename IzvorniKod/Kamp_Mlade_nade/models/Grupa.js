const db = require('../db');


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

    // dohvaća sve članove grupe iz tablice sudionik -> spojiti tablice po id_grupa
    async getAllMembers(){

    }

    // metoda za razvrstavanje sudionika u željeni broj grupa

}

dbGetAllGrupa = async () => {

}

dbGetAllMembers = async () => {

}