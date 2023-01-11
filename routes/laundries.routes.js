const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const indexMiddleware = require("../middlewares/index");
const bossMiddleware = require("../middlewares/boss");
const LaundriesController = require("../controller/laundries.controller");
const laundriesController = new LaundriesController();

// multer setting (세탁물 이미지 업로드 기능)
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, "upload");
    },
    // convert a file name
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.get("/user", indexMiddleware, laundriesController.findMyLaundries); // 내 세탁물 조회 (손님)
router.post(
  "/",
  upload.single("image"),
  indexMiddleware,
  laundriesController.createLaundry
); // 세탁물 신청 (이미지 업로드 미들웨어 포함)
router.patch("/:laundryId", bossMiddleware, laundriesController.updateLaundry); // 세탁물 변경
router.get("/", bossMiddleware, laundriesController.findAllLaundries); // 전체 세탁물 조회 (사장님)

module.exports = router;
