const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middlewares/index");

const ReviewsController = require("../controller/reviews.controller");
const reviewsController = new ReviewsController();

router.get("/reviews", reviewsController.getAllReview); //모든 리뷰 조회

router.use(indexMiddleware, (req, res, next) => {
  next();
});

router.post("/:laundryId/reviews/:bossId", reviewsController.createReview); // 리뷰작성
router.get("/:user_id/reviews", reviewsController.getReview); //아이디로 조회
router.patch("/reviews/:reviewId", reviewsController.updateReview); //수정
router.delete("/reviews/:reviewId", reviewsController.deleteReview); // 삭제

module.exports = router;
