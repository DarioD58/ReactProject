const express = require('express');
const router = express.Router();


router.get("/", async (req, res, next) => {
    req.session.userStatus = undefined;
    req.session.userName = undefined;
    res.json("Korisnik uspješno odjavljen");
});

module.exports = router;