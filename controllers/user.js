import User from "../models/user.js";
import bcrypt from "bcrypt";

const passwordChanged = async (req, res) => {
  try {
    const {userID, currentPassword, newPassword } = req.body;
   console.log(currentPassword)
   console.log(newPassword)
      if (currentPassword === newPassword) {
        res.status(475).json({
          status: "fail",
          error: "eski şifre ile yeni şifre aynı olamaz...",
        });
      } else {
        const user = await User.findOne({ _id: userID });
        if (user) {
          bcrypt.compare(currentPassword, user.password, async(err, same) => {
            console.log("same: ", same)
            if (same) {
              user.password = newPassword.toString();
              await user.save();
                res.status(200).json({
                  status: "success",
                });
            }
            else {
              // bcrypt karşılaştırma hatası
              return res.status(500).json({
                status: "fail",
                error: "Şifre karşılaştırma işlemi sırasında bir hata oluştu.",
              });
            }
          });
        }
      }
    
    
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
}

export { passwordChanged };