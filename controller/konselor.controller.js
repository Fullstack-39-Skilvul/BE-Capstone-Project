const Booking = require("../models/booking");
const Konselor = require("../models/konselor");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const bcrypt = require("bcrypt");

module.exports = {
  getAllKonselor: async (req, res) => {
    try {
      const konselors = await Konselor.find().populate("spesialisasi");
      res.json({
        message: "Berhasil mendapatkan data konselor",
        data: konselors,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data konselor" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getDataKonselor: async (req, res) => {
    try {
      const konselors = await Konselor.find()
        .select("avatar nama spesialisasi")
        .populate("spesialisasi");
      res.json({
        message: "Berhasil mendapatkan data konselor",
        data: konselors,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data konselor" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getKonselorById: async (req, res) => {
    const { id } = req.params;

    try {
      const konselor = await Konselor.findById(id).populate("spesialisasi");
      if (!konselor) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(konselor);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data konselor" + error,
      });
    }
  },

  getJadwalKonselorById: async (req, res) => {
    const { id } = req.params;

    try {
      const booking = await Booking.find({ konselor: id })
        .populate({
          path: "pasien",
          select: "_id namaPasien email noTelepon",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar",
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

  createKonselor: async (req, res) => {
    try {
      // Upload image to cloudinary, if a file is provided
      let avatarUrl = ""; // Default avatar URL

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        avatarUrl = result.secure_url;
      } else {
        // If no file is provided, use the default avatar URL
        avatarUrl = "https://i.stack.imgur.com/l60Hf.png"; // Ganti dengan URL gambar default yang sesuai
      }

      // Hash password sebelum menyimpannya di database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const konselorData = {
        ...req.body,
        password: hashedPassword,
        avatar: avatarUrl,
      };

      const createdKonselor = await Konselor.create(konselorData);

      res.json({
        message: "Berhasil membuat data konselor",
        data: createdKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data konselor: " + error.message,
      });
    }
  },

  editKonselor: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      // Check if a new avatar is provided
      if (req.file) {
        // Upload new image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        newData.avatar = result.secure_url;
      }

      // Hash password baru sebelum menyimpannya di database
      if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 10);
        newData.password = hashedPassword;
      }

      // Update the konselor data
      const updatedKonselor = await Konselor.findByIdAndUpdate(id, newData, {
        new: true,
      });

      if (!updatedKonselor) {
        return res.status(404).json({
          message: "Konselor not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data konselor",
        data: updatedKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data konselor" + error,
      });
    }
  },

  deleteKonselor: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedKonselor = await Konselor.findByIdAndDelete(id);

      if (!deletedKonselor) {
        return res.status(404).json({
          message: "Konselor not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data konselor",
        data: deletedKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data konselor" + error,
      });
    }
  },
};
