const LaundryService = require("../service/laundries.service");

class LaundriesController {
  laundryService = new LaundryService();

  // 내 세탁물 조회 (로그인한 회원의 세탁물만)
  findMyLaundries = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const User = res.locals.user.id;
      const laundries = await this.laundryService.findMyLaundries(
        user_id,
        User
      );

      // if (laundries.errormessage) {
      //   return res.json({ message: laundries.errormessage });
      // }

      res.status(200).json({ data: laundries });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };

  // 세탁물 신청하기
  createLaundry = async (req, res, next) => {
    const { phonenumber, address, comment } = req.body;
    const imageFile = req.file.filename;
    const User = res.locals.user.id;
    await this.laundryService.createLaundry(
      phonenumber,
      address,
      imageFile,
      comment,
      User
    );

    res.redirect("/mypage");
  };

  // 세탁물 상태 변경
  updateLaundry = async (req, res, next) => {
    try {
      const { laundryId } = req.params;
      const bossId = res.locals.boss.id;

      const hoho = await this.laundryService.updateLaundry(laundryId, bossId);

      if (hoho.message) {
        return res.json({ message: hoho.message });
      }

      res.status(202).send({ message: " 호호없음 작동 " });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }

    // if(hoho.message) {
    //   return res.json({message: hoho.message})
    // }
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
