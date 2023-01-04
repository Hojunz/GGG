const LaundryRepository = require("../repository/laundries.repository");

class LaundryService {
  laundryRepository = new LaundryRepository();

  // 내 세탁물 조회 (손님 전용)
  findMyLaundries = async (user_id) => {
    const allLaundries = await this.laundryRepository.findMyLaundries(user_id);

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
        createdAt: laundry.createdAt,
        updatedAt: laundry.updatedAt,
      };
    });
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

<<<<<<< HEAD
  //세탁물 상태 변경~
  updateLaundry = async(id, status) => {
      const findLaundry = await this.laundryRepository.findLaundryById(id)
      if(!findLaundry) throw new Error("세탁물이 존재하지 않아요.");
      

     await this.laundryRepository.updateLaundry(id)

     const updateLaundry = await this.laundryRepository.findLaundryById(id)

      // if (updateLaundry.status === '0') {
      //   return updateLaundry.status = '1'
      // } 
      // if (updateLaundry.status === '1') {
      //   return updateLaundry.status = '2'
      // }
      // if (updateLaundry.status === '2') {
      //   return updateLaundry.status = '3'
      // }

      return updateLaundry
  }
=======
  // 전체 세탁물 조회 (사장님 전용)
  findAllLaundries = async (req, res, next) => {
    const boss = await this.laundryRepository.findLaundryById(id);
    const laundries = await this.laundryRepository.findAllLaundries();

    return laundries;
  };
>>>>>>> feature/laundry_status&order
}

module.exports = LaundryService;
