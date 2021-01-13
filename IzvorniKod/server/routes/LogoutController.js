const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

class LogoutController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
    return JSON.stringify({status : "Korisnik uspješno odjavljen"});
    }
}

let logoutController = new LogoutController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse(await logoutController.get(req, res, next));
    res.clearCookie("korisnik");
    res.json(data);
});

module.exports = router;