//priorlty จัดลดับความสำคัญ
//register Libary:bcrypt  Step :1.check Username,Password 2.check dupicate User(obtional) 3.hook password(แปลงรหัส) 4.save to DB (diagram:Activity/sequence )

const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  const { username, password } = req.body;
     // ตรวจสอบว่าผู้ใช้ได้กรอกข้อมูลเข้ามาไหม
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requires fields!",
    });
    return;
  }

  try {
    const hashesPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashesPassword,
    });
    res.send({
      message: "User Register successfuly",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};

//Login  Libary:bcrypt  Step :1.รับข้อมูล username และ password จากผู้ใช้ 2.ตรวจสอบว่าได้รับข้อมูลครบถ้วน (เช่น username และ password ไม่ว่างเปล่า) 3.ค้นหา username ในฐานข้อมูล เพื่อยืนยันว่าผู้ใช้นั้นมีอยู่ 4.ตรวจสอบรหัสผ่าน โดยเปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนเข้ามากับรหัสผ่านที่เก็บไว้ในฐานข้อมูล
exports.login = async (req, res) => {
  // ค้นหาชื่อผู้ใช้จากตาราง User โดยใช้ username ในการหา
  const { username, password } = req.body;

   // ตรวจสอบว่าผู้ใช้ได้กรอกข้อมูลเข้ามาไหม 
   if (!username || !password) {
    res.status(400).send({
      message: "Please provide both username and password!",
    });
    return;
  }

  try {
     //ค้นหาผู้ใช้ฐานข้อมูล คำสั่ง findOne จะค้นหาข้อมูลในฐานข้อมูลที่มี username ตรงกับค่าที่ระบุ และจะส่งผลลัพธ์กลับมา
     const user = await UserModel.findOne({username})
     if (!user) {
      res.status(404).send({
        message:"User not found!!"
      })
      return
     }
      // เปรียบเทียบรหัสผ่าน
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword){
        res.status(404).send({
          message:"Invalid Password"
        })
        return
      }

      res.send({
        message:"Login Successful!",
        user:{
          id:user._id,
          username: user.username
        }
      })
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something went wrong during login",
    });
  }
}