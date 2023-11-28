const Booking = require("../models/booking");
const Pasien = require("../models/pasien");
const bcrypt = require("bcrypt");

module.exports = {
  getAllPasien: async (req, res) => {
    try {
      const pasien = await Pasien.find();
      res.json({
        message: "Berhasil mendapatkan data pasien",
        data: pasien,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data pasien" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getPasienById: async (req, res) => {
    const { id } = req.params;

    try {
      const pasien = await Pasien.findById(id);
      if (!pasien) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(pasien);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data pasien" + error,
      });
    }
  },

  getJadwalPasienById: async (req, res) => {
    const { id } = req.params;

    try {
      const booking = await Booking.find({ pasien: id })
        .populate({
          path: "pasien",
          select: "_id namaPasien",
        })
        .populate({
          path: "konselor",
          select: "_id nama",
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });
      if (!booking) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data konselor" + error,
      });
    }
  },

  createPasien: async (req, res) => {
    const { namaPasien, email, password, alamat, noTelepon } = req.body;

    try {
      // Cek apakah email sudah terdaftar
      const existingPasien = await Pasien.findOne({ email });
      if (existingPasien) {
        throw new Error("Email is already registered");
      }

      // Hash password sebelum menyimpannya di database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah cost factor

      // Simpan data pasien ke dalam database
      await Pasien.create({
        namaPasien,
        email,
        password: hashedPassword,
        alamat,
        noTelepon,
      });

      res.json({
        message: "Berhasil membuat data pasien",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data pasien: " + error.message,
      });
    }
  },

  editPasien: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedPasien = await Pasien.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedPasien) {
        return res.status(404).json({
          message: "Pasien not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data pasien",
        // data: updatedPasien,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data pasien" + error,
      });
    }
  },

  deletePasien: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedPasien = await Pasien.findByIdAndDelete(id);

      if (!deletedPasien) {
        return res.status(404).json({
          message: "Pasien not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data pasien",
        data: deletedPasien,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data pasien" + error,
      });
    }
  },
};
