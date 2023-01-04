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

  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    const laundries = await Laundry.findAll({});

    return laundries;
  };

  // Boss 여부 확인
  findLaundryById = async (id) => {
    const boss = await Boss.findByPk(id);
    return boss;
  };
}

module.exports = LaundryRepository;
