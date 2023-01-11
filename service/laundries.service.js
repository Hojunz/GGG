const LaundryRepository = require("../repository/laundries.repository");

class LaundryService {
  laundryRepository = new LaundryRepository();

  // 내 세탁물 조회 (손님 전용)
  findMyLaundries = async (User) => {
    try {
      const allLaundries = await this.laundryRepository.findMyLaundries(User);

      // if (User !== allLaundries.user_id) {
      //   return { errormessage: "로그인한 분의 세탁물이 아닙니다." };
      // }

      allLaundries.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return allLaundries.map((laundry) => {
        return {
          id: laundry.id,
          phonenumber: laundry.phonenumber,
          address: laundry.address,
          image: laundry.image,
          comment: laundry.comment,
          status: laundry.status,
          createdAt: laundry.createdAt,
          updatedAt: laundry.updatedAt,
        };
      });
    } catch (error) {
      return { error: errormessage };
    }
  };

  // 세탁물 신청 (손님 전용)
  createLaundry = async (phonenumber, address, image, comment, user_id) => {
    const createLaundryData = await this.laundryRepository.createLaundry(
      phonenumber,
      address,
      image,
      comment,
      user_id
    );

    return {
      phonenumber: createLaundryData.phonenumber,
      address: createLaundryData.address,
      image: createLaundryData.image,
      comment: createLaundryData.comment,
      user_id: createLaundryData.user_id,
      createdAt: createLaundryData.createdAt,
      updatedAt: createLaundryData.updatedAt,
    };
  };

  // 세탁물 상태 변경
  updateLaundry = async (laundryId, bossId) => {
    try {
      const findLaundry = await this.laundryRepository.findLaundryById(
        laundryId
      );

      if (!findLaundry) throw new Error("세탁물이 존재하지 않아요.");

      if (findLaundry.status === "대기중") {
        findLaundry.status = "접수완료";
        findLaundry.boss_id = bossId;
        await this.laundryRepository.updateLaundry(findLaundry);

        await this.laundryRepository.moveMoney(laundryId);

        return { message: "접수가 완료되었습니다" };
      }
      if (findLaundry.status === "접수완료") {
        findLaundry.status = "수거완료";
        await this.laundryRepository.updateLaundry(findLaundry);

        return { message: "수거 완료" };
      }
      if (findLaundry.status === "수거완료") {
        findLaundry.status = "배송중";
        await this.laundryRepository.updateLaundry(findLaundry);

        return { message: "배송중 입니다." };
      }
      if (findLaundry.status === "배송중") {
        findLaundry.status = "배송완료";
        await this.laundryRepository.updateLaundry(findLaundry);

        return { message: "배송 완료했어요!" };
      }

      return { message: "상태변경이 더이상 불가능합니다." };
    } catch (err) {
      return { errormessage: "서비스 오류" };
    }
  };

  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    // boss 여부 확인 (isBusiness 컬럼 추가 필요)
    // const boss = await this.laundryRepository.findBossById(id);
    // if (!boss.isBusiness) {
    //   return { errorMessage: "보스만 접근가능합니다" }
    // }
    const laundries = await this.laundryRepository.findAllLaundries();

    return laundries;
  };
}

module.exports = LaundryService;
