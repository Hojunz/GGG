const LaundryRepository = require("../repository/laundries.repository");

class LaundryService {
  laundryRepository = new LaundryRepository();

  findMyLaundries = async () => {
    const allLaundries = await this.laundryRepository.findAllLaundries(user_id);

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

  //세탁물 상태 변경~
  updateLaundry = async(id, status) => {
      const findLaundry = await this.laundryRepository.findLaundryById(id)
      if(!findLaundry) throw new Error("세탁물이 존재하지 않아요.");
      
      if(findLaundry.status >= 4) throw new Error("상태변경 불가")
      const updateLaundry = await this.laundryRepository.updateLaundry(id)


      // const updateLaundry = await this.laundryRepository.findLaundryById(id)

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
}

module.exports = LaundryService;
