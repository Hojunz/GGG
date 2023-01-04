const { Laundry, Boss } = require("../models");

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
    const laundryData = await Laundry.findByPk(laundryId)
    // console.log("리포지토링", laundryData)

    return laundryData;
  };

  //세탁물 상태 변경
  updateLaundry = async (findLaundry) => {
    const updateLaundryData = await findLaundry.save()
   
    return updateLaundryData;
  };

  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    const laundries = await Laundry.findAll({});

    return laundries;
  };

  // Boss 여부 확인
  findBossById = async (id) => {
    const boss = await Boss.findByPk(id);
    return boss;
  };
}

module.exports = LaundryRepository;
