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
}

module.exports = LaundryService;
