const { Laundry } = require("../models");
const Boss = require("../models/boss");

class LaundryRepository {
  // 내 세탁물만 조회하기 (회원)
  findMyLaundries = async (user_id) => {
    const laundries = await Laundry.findAll({
      attribute: [
        "phonenumber",
        "image",
        "comment",
        "status",
        "createdAt",
        "updatedAt",
        "boss_id",
      ],
      where: { user_id },
    });
    return laundries;
  };

  // 세탁물 신청하기
  createLaundry = async (phonenumber, address, image, comment, user_id) => {
    const createLaundryData = await Laundry.create({
      phonenumber,
      address,
      image,
      comment,
      user_id,
    });

    return createLaundryData;
  };

  //특정 세탁물 id 찾기
  findLaundryById = async (laundryId) => {
    const laundryData = await Laundry.findOne({ where: { id: laundryId } });
    return laundryData;
  };

  //세탁물 상태 변경
  updateLaundry = async (laundryId, status, boss_id) => {
    const updateLaundryData = await Laundry.update(
      { status, boss_id },
      { where: { id: laundryId } }
    );
    // update({status}, {where: {id}})
    //increment({status: 1}, {where: {id}})
    return updateLaundryData;
  };

  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    const laundries = await Laundry.findAll({});

    return laundries;
  };

  deleteLaundry = async (req, res, next) => {
    try {
      const { laundryId, user_id } = req.params;
      const User = res.locals.user.id;

      if (User !== user_id) {
        res
          .status(400)
          .send({ errorMessage: "세탁물을 신청한 유저가 아닙니다!" });
      }

      await this.reviewService.deleteReview(reviewId);
      res.status(200).send({ message: "세탁물 삭제 완료!" });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };

  // Boss 여부 확인
  findBossById = async (id) => {
    const boss = await Boss.findByPk(id);
    return boss;
  };
}

module.exports = LaundryRepository;
