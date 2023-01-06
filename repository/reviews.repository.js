const { Review, Laundry } = require("../models");

class ReviewRepository {
  //리뷰등록
  createReview = async (grade, comment, laundry_id, user_id) => {
    //  const boss = await Review.findAll({include:{model: Laundry, attributes: ['boss_id'], where: {id: laundry_id}}})
    //  console.log(boss)

    const createReviewData = await Review.create({
      grade,
      comment,
      laundry_id,
      user_id,
    });
    return createReviewData;
  };
  //모든 리뷰 찾기
  findAllReview = async () => {
    const reviews = await Review.findAll();

    return reviews;
  };

  //유저리뷰 찾기
  getReview = async (user_id) => {
    const review = await Review.findAll({
      attributes: ["id", "grade", "comment", "createdAt"],
      where: { user_id },
    });
    return review;
  };

  //리뷰 수정
  updateReview = async (id, grade, comment) => {
    const updateReviewData = await Review.update(
      { grade, comment },
      { where: { id } }
    );
    // const updateReviewData = await Review.update(
    //   { grade, comment },
    //   { where: { [Op.and]: [{ id }, { user_id }] } }
    // );

    return updateReviewData;
  };

  //리뷰 삭제
  deleteReview = async (id) => {
    const deleteReviewData = await Review.destroy({ where: { id } });
    return deleteReviewData;
  };

  //특정 id 찾기
  findReviewById = async (id) => {
    const review = await Review.findByPk(id);

    return review;
  };
}

module.exports = ReviewRepository;
