const LaundryService = require("../service/laundries.service");

class LaundriesController {
  laundryService = new LaundryService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getLaundries = async (req, res, next) => {
    const laundries = await this.laundryService.findAllLaundries();

    res.status(200).json({ data: laundries });
  };

  createLaundry = async (req, res, next) => {
    const { nickname, phonenumber, address, image, comment } = req.body;

    const createLaundryData = await this.laundryService.createLaundry(
      nickname,
      phonenumber,
      address,
      image,
      comment
    );

    res.status(201).json({ data: createLaundryData });
  };
}

module.exports = LaundriesController;
