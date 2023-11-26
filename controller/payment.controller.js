const Booking = require("../models/booking");
const Payment = require("../models/payment");

module.exports = {
  getAllPayment: async (req, res) => {
    try {
      const payments = await Payment.find().populate({
        path: "dataBooking",
        select: "_id tanggal waktu status",
        populate: {
          path: "pasien konselor jenisKonseling",
          select: "namaPasien nama jenis harga paltformPertemuan",
        },
      });
      res.json({
        message: "Berhasil mendapatkan data payment",
        data: payments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data payment" + error, // Menambahkan pesan kesalahan ke dalam respons
      });
    }
  },

  getPaymentById: async (req, res) => {
    const { id } = req.params;

    try {
      const payment = await Payment.findById(id).populate({
        path: "dataBooking",
        select: "_id tanggal waktu status",
        populate: {
          path: "pasien konselor jenisKonseling",
          select: "namaPasien nama jenis harga paltformPertemuan",
        },
      });
      if (!payment) {
        return res.status(404).json({
          message: "Id not found",
        });
      }

      res.json(payment);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan data payment" + error,
      });
    }
  },

  createPayment: async (req, res) => {
    let data = req.body;

    try {
      await Payment.create(data);
      res.json({
        message: "Berhasil membuat data payment",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat data payment" + error,
      });
    }
  },

  updatePayment: async (req, res) => {
    const { id } = req.params;
    const { statusPembayaran, statusBooking } = req.body;

    try {
      const updatedPayment = await Payment.findByIdAndUpdate(
        id,
        {
          $set: { statusPembayaran: statusPembayaran },
        },
        { new: true }
      );

      if (!updatedPayment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      await Booking.findByIdAndUpdate(updatedPayment.dataBooking, {
        $set: { status: statusBooking },
      });

      res.json({
        message: "Berhasil mengupdate data payment",
        data: updatedPayment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate data payment" + error,
      });
    }
  },

  deletePayment: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedPayment = await Payment.findByIdAndDelete(id);

      if (!deletedPayment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      res.json({
        message: "Berhasil menghapus data payment",
        data: deletedPayment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data payment" + error,
      });
    }
  },
};
