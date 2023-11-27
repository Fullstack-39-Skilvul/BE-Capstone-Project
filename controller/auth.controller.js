const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Konselor = require("../models/konselor");
const Pasien = require("../models/pasien");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_KEY
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user di semua koleksi (admin, konselor, pasien)
    const adminUser = await Admin.findOne({ email });
    const konselorUser = await Konselor.findOne({ email });
    const pasienUser = await Pasien.findOne({ email });

    // Pilih user dengan role tertentu sesuai dengan data yang ditemukan
    const user = adminUser || konselorUser || pasienUser;

    if (!user) {
      throw new Error("Invalid credentials: User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials: Email or password is incorrect");
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { login };
