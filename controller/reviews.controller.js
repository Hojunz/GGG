const ReviewService = require("../service/reviews.service");

class ReviewsController {
  reviewService = new ReviewService();

  //리뷰 작성
  createReview = async (req, res, next) => {
    try {
      const { grade, comment } = req.body;
      const { laundryId } = req.params;
      const User = res.locals.user.id;

      if (!grade) {
        res.status(400).send({ errorMessage: "점수를 입력해주세요!" });
      }
      if (!comment) {
        res.status(400).send({ errorMessage: "내용을 입력해주세요!" });
      }

      await this.reviewService.createReview(grade, comment, laundryId, User);

      // res.redirect("/api/laundry/1/reviews");
      res.render("userreviews");
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };

  // 모든 리뷰 조회
  getAllReview = async (req, res, next) => {
    const review = await this.reviewService.findAllReview();

    res.status(200).json({ data: review });
  };

  // 유저 리뷰 조회 (지금 로그인 된 사용자것만 불러오기, 에러처리)
  getReview = async (req, res, next) => {
    const { user_id } = req.params;

    const review = await this.reviewService.getReview(user_id);

    res.status(200).json({ data: review });
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { grade, comment } = req.body;
      const User = res.locals.user.id;

      await this.reviewService.updateReview(reviewId, grade, comment, User);
      const huhu = await this.reviewService.updateReview(
        reviewId,
        grade,
        comment,
        User
      );

      if (huhu.errormessage) {
        return res.json({ errormessage: huhu.errormessage });
      }

      res.status(200).send({ message: "리뷰 수정 완료!" });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const User = res.locals.user.id;

      await this.reviewService.deleteReview(reviewId, User);
      res.status(200).send({ message: "리뷰 삭제 완료!" });
      const hihi = await this.reviewService.deleteReview(reviewId, User);

      if (hihi.errormessage) {
        return res.json({ errormessage: hihi.errormessage });
      }

      res.status(200).send({ message: "리뷰 삭제 완료!" });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };
}

module.exports = ReviewsController;
