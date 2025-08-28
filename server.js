const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// 업로드 저장소 설정 (uploads/ 폴더에 저장)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 저장 위치
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // 파일명 저장
  }
});

const upload = multer({ storage: storage });

// 업로드 API
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("폼 데이터:", req.body); // username 같은 일반 필드
  console.log("파일 데이터:", req.file); // 업로드된 파일 정보

  res.json({
    message: "파일 업로드 성공!",
    formData: req.body,
    file: req.file
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
