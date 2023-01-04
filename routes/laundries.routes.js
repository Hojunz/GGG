const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const indexMiddleware = require("../middlewares/index");
const LaundriesController = require("../controller/laundries.controller");
const laundriesController = new LaundriesController();

// 로그인 인증 미들웨어
// router.use(indexMiddleware, (req, res, next) => {
//   next();
// });

// 세탁물 신청 폼
router.get("/order", async (req, res) => {
  res.render("order.ejs", { title: "세탁물 신청하기" });
});

// multer setting (세탁물 이미지 업로드 기능)
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, "public/upload/");
    },
    // convert a file name
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.get("/:user_id", laundriesController.findMyLaundries); // 내 세탁물 조회 (손님)
router.post("/", upload.single("image"), laundriesController.createLaundry); // 세탁물 신청 (이미지 업로드 미들웨어 포함)
router.patch("/:laundryId", laundriesController.updateLaundry); // 세탁물 변경
router.get("/", laundriesController.findAllLaundries); // 전체 세탁물 조회 (사장님)

module.exports = router;
