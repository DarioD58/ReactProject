const express = require('express');
const router = express.Router();
const Kamp = require('../models/Kamp');

router.get("/", async (req, res, next) => {
    try{
        let camp = await Kamp.fetchActive();
        if(camp != null){
            res.json({
                kamp : camp.ime_kamp
            });
        } else {
            let camp = await Kamp.fetchUpcoming();
            let timer = new Date(camp.datum_odrzavanja); // za sad podržavamo jedan aktivni kamp
            res.json({
                kamp : camp.ime_kamp,
                pocetak_kamp : timer.toString()
            });
        }
        let timer = new Date(camp.datum_odrzavanja); // za sad podržavamo jedan aktivni kamp
        res.json({
            kamp : camp.ime_kamp,
            pocetak_kamp : timer.toString()
        });
    
    } catch (err) {
        res.json("There is no active or upcoming camps.");
        console.error(err);
    }
    
   
});

module.exports = router;