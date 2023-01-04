const { Laundry } = require("../models");

class LaundryRepository {
  findMyLaundries = async (user_id) => {
    const laundries = await Laundry.findAll(user_id);

    return laundries;
  };

  createLaundry = async (
    phonenumber,
    address,
    image,
    comment,
    user_id
  ) => {
    const createLaundryData = await Laundry.create({
      phonenumber,
      address,
      image,
      comment,
      user_id,
    });

    return createLaundryData;
  };

  //세탁물 상태 변경
  updateLaundry = async(id ,status) => {
    const updateLaundryData = await Laundry.update({status}, {where: {id}})
    // update({status}, {where: {id}})
    //increment({status: 1}, {where: {id}})
    return updateLaundryData
  }

  //특정 id 찾기
  findLaundryById = async(id) => {
    const laundry = await Laundry.findByPk(id)

    return laundry
  }

}

module.exports = LaundryRepository;
