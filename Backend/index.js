const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const { upload } = require("./middlewares/file.middleware");

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(
  cors({
    origin: ["https://web-blog-six.vercel.app", "https://web-blog-2k9x43h1g-saminds-projects.vercel.app"], // อนุญาตเฉพาะ URL ของ Frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Methods ที่อนุญาต
    allowedHeaders: ["Content-Type", "x-access-token"], // Headers ที่อนุญาต
    credentials: true, // อนุญาต Cookies หรือข้อมูล Credential
  })
);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // เปิดใช้งาน Preflight Request
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU BLOG Restful API</h1>");
});


// กำหนดให้ Express เสิร์ฟไฟล์จากโฟลเดอร์ upload
app.use("/uploads", express.static(__dirname + "/uploads"))

//เชื่อมต่อMongo DB
try {
  mongoose.connect(DB_URL);
  console.log("Connet to Mongo DB Successfuly");
} catch (err) {
  console.log("DB Connection Failed");
}

//user router
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post", postRouter);


//สั่งให้ทำงาน
app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);
});
