const jwt = require("jsonwebtoken");
const db = require("../models");
const otorisasi = async (request, response, next) => {
    try {
        const bearerToken = request.headers.Authorization;
        const token = bearerToken.split("bearer ")[1];
        const isiDataToken = jwt.verify(token, "secret");
        await db.Authorization.findByPk(isiDataToken.id)    

        request.user = await db.User.findByPk(isiDataToken.id);
        request.role = isiDataToken.role;
        request.userId = isiDataToken.id;
        //console.log(request.role);

        next();
    } catch(err){
        request.status(402).json({ message: "Otentikasi gagal!"});
    }

}
module.exports = {otorisasi};