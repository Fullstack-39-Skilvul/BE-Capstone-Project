const Pasien = require("../models/pasien");

module.exports = {
  getAllPasien: async (req, res) => {
    try {
      const pasiens = await Pasien.find();
      res.json({
        message: "Berhasil mendapatkan data pasien",
        data: pasiens,
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

  createPasien: async (req, res) => {
    let data = req.body;

    try {
      await Pasien.create(data);
      res.json({
        message: "Berhasil membuat data pasien",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data pasien" + error,
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
        data: updatedPasien,
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
