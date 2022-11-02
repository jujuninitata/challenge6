 const database = require("./../models");
 const AmbilSemuaPengguna = async (request, response) => {
    const dataPengguna = await database.Authentication.findAll();
    return response.status(200).json({message: "semua data pengguna users", data: dataPengguna})
 }
 module.exports = {AmbilSemuaPengguna}