const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const indexMiddleware = require("../middlewares/index");
const LaundriesController = require("../controller/laundries.controller");
const laundriesController = new LaundriesController();

router.use(indexMiddleware, (req, res, next) => {
  next();
});

router.get("/order", async (req, res) => {
  res.render("order.ejs", { title: "세탁물 신청하기" });
});

router.get("/", laundriesController.findMyLaundries);

// multer setting
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, "upload/");
    },
    // convert a file name
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.post("/", upload.single("image"), laundriesController.createLaundry);
router.patch('/:laundryId', laundriesController.updateLaundry)


module.exports = router;
