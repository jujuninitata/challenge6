const router = require("express").Router();
const {AmbilSemuaPengguna} = require("./../controllers/controllerPengguna");
const {otorisasi} = require("./../utils/otentikasi");

router.get("/", AmbilSemuaPengguna );

module.exports = router;