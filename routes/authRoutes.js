const router = require("express").Router();
const {
    pendaftaran,
    masuk,
    siapakahAku,
    otorisasi,
    pendaftaranAdmin,
    superAdminLogin,
    adminLogin,
} = require("./../controllers/controllerOtentikasi");

router.post("/masuk", masuk);
router.post("/daftar", pendaftaran);

router.post("/login-superadmin", superAdminLogin);
router.post("/admin-login", adminLogin);
router.get("/siapakahaku", otorisasi, siapakahAku);
router.post("/daftar-admin", otorisasi, pendaftaranAdmin);

module.exports = router;
