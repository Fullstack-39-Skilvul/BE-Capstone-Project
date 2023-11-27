const JenisKonseling = require("../models/jenisKonseling");

module.exports = {
  getAllJenisKonseling: async (req, res) => {
    try {
      const jeniskonselings = await JenisKonseling.find();
      res.json({
        message: "Berhasil mendapatkan data jeniskonseling",
        data: jeniskonselings,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data jeniskonseling" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getJenisKonselingById: async (req, res) => {
    const { id } = req.params;

    try {
      const jeniskonseling = await JenisKonseling.findById(id);
      if (!jeniskonseling) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(jeniskonseling);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data jeniskonseling" + error,
      });
    }
  },

  createJenisKonseling: async (req, res) => {
    let data = req.body;

    try {
      await JenisKonseling.create(data);
      res.json({
        message: "Berhasil membuat data jeniskonseling",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data jeniskonseling" + error,
      });
    }
  },

  editJenisKonseling: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedJenisKonseling = await JenisKonseling.findByIdAndUpdate(
        id,
        newData,
        {
          new: true,
        }
      );
      if (!updatedJenisKonseling) {
        return res.status(404).json({
          message: "JenisKonseling not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data jeniskonseling",
        data: updatedJenisKonseling,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data jeniskonseling" + error,
      });
    }
  },

  deleteJenisKonseling: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedJenisKonseling = await JenisKonseling.findByIdAndDelete(id);

      if (!deletedJenisKonseling) {
        return res.status(404).json({
          message: "JenisKonseling not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data jeniskonseling",
        data: deletedJenisKonseling,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data jeniskonseling" + error,
      });
    }
  },
};
