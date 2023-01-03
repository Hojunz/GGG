const { Laundry } = require("../models");

class LaundryRepository {
  findMyLaundries = async (user_id) => {
    const laundries = await Laundry.findAll(user_id);

    return laundries;
  };

  createLaundry = async (
    nickname,
    phonenumber,
    address,
    image,
    comment,
    user_id
  ) => {
    const createLaundryData = await Laundry.create({
      nickname,
      phonenumber,
      address,
      image,
      comment,
      user_id,
    });

    return createLaundryData;
  };
}

module.exports = LaundryRepository;
