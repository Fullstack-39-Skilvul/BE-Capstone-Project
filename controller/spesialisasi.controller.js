const Spesialisasi = require("../models/spesialisasi");

module.exports = {
  getAllSpesialisasi: async (req, res) => {
    try {
      const spesialisasis = await Spesialisasi.find();
      res.json({
        message: "Berhasil mendapatkan data spesialisasi",
        data: spesialisasis,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data spesialisasi" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getSpesialisasiById: async (req, res) => {
    const { id } = req.params;

    try {
      const spesialisasi = await Spesialisasi.findById(id);
      if (!spesialisasi) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(spesialisasi);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data spesialisasi" + error,
      });
    }
  },

  createSpesialisasi: async (req, res) => {
    let data = req.body;

    try {
      await Spesialisasi.create(data);
      res.json({
        message: "Berhasil membuat data spesialisasi",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data spesialisasi" + error,
      });
    }
  },

  editSpesialisasi: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedSpesialisasi = await Spesialisasi.findByIdAndUpdate(
        id,
        newData,
        {
          new: true,
        }
      );
      if (!updatedSpesialisasi) {
        return res.status(404).json({
          message: "Spesialisasi not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data spesialisasi",
        data: updatedSpesialisasi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data spesialisasi" + error,
      });
    }
  },

  deleteSpesialisasi: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedSpesialisasi = await Spesialisasi.findByIdAndDelete(id);

      if (!deletedSpesialisasi) {
        return res.status(404).json({
          message: "Spesialisasi not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data spesialisasi",
        data: deletedSpesialisasi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data spesialisasi" + error,
      });
    }
  },
};
