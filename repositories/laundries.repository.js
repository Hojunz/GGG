const { laundry } = require("../models");

class LaundryRepository {
  findAllLaundries = async () => {
    const laundries = await laundry.findAll();

    return laundries;
  };

  createLaundry = async (nickname, phonenumber, address, image, comment) => {
    const createLaundryData = await laundry.create({
      nickname,
      phonenumber,
      address,
      image,
      comment,
    });

    return createLaundryData;
  };
}

module.exports = LaundryRepository;
