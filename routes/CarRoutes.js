const express = require("express");
const { TambahMobil, AmbilSemuaMobil, AmbilSatuMobil, ubahMobil, hapusMobil } = require("../controllers/controllerMobil")
const router = express.Router();
const { otorisasi } = require("./../utils/otentikasi");
router.get("/", AmbilSemuaMobil);
router.post("/", otorisasi, TambahMobil);
router.get("/:id", AmbilSatuMobil);
router.delete("/:id", otorisasi, hapusMobil);
router.put("/:id", otorisasi, ubahMobil);
module.exports = router;

