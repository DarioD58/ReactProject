const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

class LogoutController extends Controller {
    constructor(){
        super();
    }

    async get(req, res, next) {
        if(req.session.userStatus != undefined && req.session.userName != undefined){
        req.session.userStatus = undefined;
        req.session.userName = undefined;
        return JSON.stringify({status : "Korisnik uspješno odjavljen"});
        } else {
            return JSON.stringify({Message_from_space : "Hello Wonderer"});
        }
    }
}

let logout = new LogoutController();
router.get("/", async (req, res, next) => {
    let data = JSON.parse(await logout.get(req, res, next));
    res.json(data);
});

module.exports = router;