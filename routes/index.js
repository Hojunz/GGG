const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const usersRouter = require("./users.routes");
const bossesRouter = require("./boss.routes");
const reviewsRouter = require("./reviews.routes");
const laundriesRouter = require("./laundries.routes");

router.use("/user", usersRouter);
router.use("/boss", bossesRouter);
router.use("/laundry", reviewsRouter);
router.use("/laundries", laundriesRouter);

module.exports = router;
