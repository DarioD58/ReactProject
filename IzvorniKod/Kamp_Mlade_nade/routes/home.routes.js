const express = require('express');
const router = express.Router();
const Kamp = require('../models/Kamp');

router.get("/", async (req, res, next) => {
    try{
        let camps = await Kamp.fetchActiveOrUpcoming();
        let timer = camps[0].datum_odrzavanja; // za sad podržavamo jedan aktivni kamp
        res.json(timer);
    } catch (err) {
        res.json("There is no active or upcoming camps.");
    }
    
   
});

module.exports = router;