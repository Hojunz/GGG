const LaundryService = require("../service/laundries.service");

class LaundriesController {
  laundryService = new LaundryService();

  // 내 세탁물 조회 (로그인한 회원의 세탁물만)
  findMyLaundries = async (req, res, next) => {
    const { user_id } = req.params;
    const laundries = await this.laundryService.findMyLaundries(user_id);

    res.status(200).json({ data: laundries });
  };

  // 세탁물 신청하기 (phonenumber 사라지는 이슈 해결)
  createLaundry = async (req, res, next) => {
    const { phonenumber, address, image, comment } = req.body;
    const imageFile = req.file.filename;
    const User = res.locals.user.id;
    const createLaundryData = await this.laundryService.createLaundry(
      phonenumber,
      address,
      imageFile,
      comment,
      User
    );

    res.status(201).json({ createLaundryData });
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
