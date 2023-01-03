const LaundryService = require("../service/laundries.service");

class LaundriesController {
  laundryService = new LaundryService();

  // 내 세탁물 찾기 (로그인한 회원의 세탁물만)
  findMyLaundries = async (req, res, next) => {
    const { user_id } = req.params;
    const laundries = await this.laundryService.findMyLaundries(user_id);

    res.status(200).json({ data: laundries });
  };

  // 세탁물 신청하기 (phonenumber 사라지는 이슈 있음)
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
}

module.exports = LaundriesController;
