const LaundryService = require("../service/laundries.service");

class LaundriesController {
  laundryService = new LaundryService();

  // 내 세탁물 조회 (로그인한 회원의 세탁물만)
  findMyLaundries = async (req, res, next) => {
    const { user_id } = req.params;
    const laundries = await this.laundryService.findMyLaundries(user_id);

    res.status(200).json({ data: laundries });
  };

  // 세탁물 신청하기
  createLaundry = async (req, res, next) => {
    const { phonenumber, address, image, comment } = req.body;
    const imageFile = req.file.filename;
    // const User = res.locals.user.id;
    const createLaundryData = await this.laundryService.createLaundry(
      phonenumber,
      address,
      imageFile,
      comment
      // User
    );

    res.status(201).json({ createLaundryData });
  };

  // 세탁물 삭제하기
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

  // 세탁물 상태 변경
  updateLaundry = async (req, res, next) => {
    try {
      const { laundryId } = req.params;
      const bossId = res.locals.user.id;
      const isAdmin = res.locals.isAdmin;
      // console.log('보스:', bossId, '관리자? : ', isAdmin)
      await this.laundryService.updateLaundry(laundryId);

      return res.status(201).send({ message: "세탁물 상태가 변경되었습니다!" });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };

  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    try {
      const laundries = await this.laundryService.findAllLaundries();

      res.status(200).json({ data: laundries });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };
}

module.exports = LaundriesController;
