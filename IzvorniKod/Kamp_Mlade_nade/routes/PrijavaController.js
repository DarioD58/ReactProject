const router = require("./HomeController");


class PrijavaController extends Controller {
    constructor(){
        super();
    }

    async pregledAktivnihPrijava(req, res, next){
        res.cookie.data;
    }
}

let prijava = new PrijavaController();

router.get("/", async (req, res, next) => {
    let data = JSON.parse( await login.pregledAktivnihPrijava(req, res, next));
    if(data.error != null){
        res.status(400).json(data);
    } else {
        res.cookie("userData", data);
        res.json(data);
    }
});