const database = require("../models");
//untuk menampilkan semua data mobil
const AmbilSemuaMobil = (request, response) =>
 {
    database.Car.findAll()
        .then((cars) => {
            response.status(200).json({ message: "semua data mobil yang ada", data: cars });
        })
        .catch((err) => {
            response.status(500).json({ message: err.message });
        });
  };
  
//untuk menambahkan data mobil
const TambahMobil = (request, response) => 
{
  if (request.role !== "superadmin" && request.role !== "admin") {
      return response.status(403).json({ message: "Anda tidak memiliki akses" });
  }

  const { name, size, price, photo } = request.body;

  database.Car.create({
      name,
      size,
      price,
      photo,
      createdBy: request.userId,
  })
      .then((car) => {
        response.status(200).json({ message: "Data Mobil berhasil ditambahkan", data: car });
      })
      .catch((err) => {
        response.status(500).json({ message: err.message });
      });
};

//untuk mendapatkan data mobil berdasarkan ID
const AmbilSatuMobil = (request, response) => 
{
  const id = request.params.id;
  database.Car.findByPk(id)
      .then((car) => {
          response.status(200).json({ message: "Berikut adalah mobil berdasarkan id", data: car });
      })
      .catch((err) => {
          response.status(500).json({ message: err.message });
      });
};

//untuk menghapus data mobil
const hapusMobil = (request, response) => 
{
    if (request.role !== "superadmin" && request.role !== "admin") {
        return response.status(403).json({ message: "Anda tidak memiliki akses!!!" });
    }
    const id = request.params.id;
    database.Car.destroy({
        where: { id: id },
    })
        .then((car) => {
            response.status(200).json({ message: "Mobil berhasil di hapus", data: car });
        })
        .catch((err) => {
            response.status(500).json({ message: err.message });
        });
  };
//untuk mengubah data mobil
const ubahMobil = (request, response) => 
{
  const role = request.role;
  console.log(role);
  if (role !== "superadmin" && role !== "admin") {
      return response.status(403).json({ message: "Anda tidak memiliki akses!!!" });
  }

  const id = request.params.id;
  const { name, size, price, photo } = request.body;
  db.Car.update(
      {
          name,
          size,
          price,
          photo,
          updatedby: request.userId,
      },
      {
          where: { id: id },
      }
  )
      .then((car) => {
          response.status(200).json({ message: "Mobil berhasil di Ubah", data: car });
      })
      .catch((err) => {
          response.status(500).json({ message: err.message });
      });
};
module.exports = { TambahMobil, AmbilSemuaMobil, AmbilSatuMobil, ubahMobil, hapusMobil };
