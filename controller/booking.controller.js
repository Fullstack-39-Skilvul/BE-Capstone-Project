const Booking = require("../models/booking");

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate({
          path: "pasien",
          select: "_id namaPasien noTelepon",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar spesialisasi",
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });

      res.json({
        message: "Berhasil mendapatkan data booking",
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data booking" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getBookingById: async (req, res) => {
    const { id } = req.params;

    try {
      const booking = await Booking.findById(id)
        .populate({
          path: "pasien",
          select: "_id namaPasien",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar spesialisasi",
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
        message: "Gagal mendapatkan data booking" + error,
      });
    }
  },

  createBooking: async (req, res) => {
    let data = req.body;

    try {
      const createdBooking = await Booking.create(data);

      res.json({
        message: "Berhasil membuat data booking",
        id: createdBooking._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data booking" + error,
      });
    }
  },

  editBooking: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedBooking = await Booking.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedBooking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.json({
        message: "Berhasil mengedit data booking",
        data: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit data booking" + error,
      });
    }
  },

  deleteBooking: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);

      if (!deletedBooking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data booking",
        data: deletedBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data booking" + error,
      });
    }
  },
};
