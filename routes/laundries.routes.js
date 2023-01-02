const express = require("express");
const router = express.Router();
const multer = require("multer");

const LaundriesController = require("../controller/laundries.controller");
const path = require("path");

// multer setting
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, "src/");
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

const laundriesController = new LaundriesController();
router.get("/", laundriesController.getLaundries);
router.post("/", upload.single("image"), laundriesController.createLaundry);

module.exports = router;
