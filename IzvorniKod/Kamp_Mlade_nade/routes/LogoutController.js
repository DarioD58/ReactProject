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

let logout = new LogoutController();
router.get("/", async (req, res, next) => {
    let data = JSON.parse(await logout.get(req, res, next));
    res.clearCookie("user");
    res.json(data);
});

module.exports = router;