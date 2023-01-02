const LaundryRepository = require("../repositories/laundries.repository");

class LaundryService {
  laundryRepository = new LaundryRepository();

  findAllLaundries = async () => {
    const allLaundries = await this.laundryRepository.findAllLaundries();

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

  createLaundry = async (nickname, phonenumber, address, image, comment) => {
    const createLaundryData = await this.laundryRepository.createLaundry(
      nickname,
      phonenumber,
      address,
      image,
      comment
    );

    return {
      phonenumber: createLaundryData.phonenumber,
      address: createLaundryData.address,
      image: createLaundryData.image,
      comment: createLaundryData.comment,
      createdAt: createLaundryData.createdAt,
      updatedAt: createLaundryData.updatedAt,
    };
  };
}

module.exports = LaundryService;
