const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

module.exports = {
  getAllAdmin: async (req, res) => {
    try {
      const admin = await Admin.find();
      res.json({
        message: "Berhasil mendapatkan data admin",
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data admin" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getAdminById: async (req, res) => {
    const { id } = req.params;

    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(admin);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data admin" + error,
      });
    }
  },

  createAdmin: async (req, res) => {
    const { nama, email, password } = req.body;

    try {
      // Cek apakah email sudah terdaftar
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        throw new Error("Email is already registered");
      }

      // Hash password sebelum menyimpannya di database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah cost factor

      // Simpan data admin ke dalam database
      await Admin.create({
        nama,
        email,
        password: hashedPassword,
      });

      res.json({
        message: "Berhasil membuat data admin",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data admin: " + error.message,
      });
    }
  },

  editAdmin: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedAdmin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data admin",
        data: updatedAdmin,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data admin" + error,
      });
    }
  },

  deleteAdmin: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedAdmin = await Admin.findByIdAndDelete(id);

      if (!deletedAdmin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data admin",
        data: deletedAdmin,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data admin" + error,
      });
    }
  },
};
