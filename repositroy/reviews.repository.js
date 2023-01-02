const {Review} = require('../models')

class ReviewRepository {
    //리뷰등록
    createReview = async(grade, comment, user_id, laundry_id) => {
        
        const createReviewData = await Review.create({grade, comment, user_id, laundry_id})
        return createReviewData
    } 
    //리뷰 찾기
    getReview = async(user_id) => {
        const review = await Review.findAll({
            attributes: ['grade', 'comment'],
            where: {user_id}
        })
        return review
    }

    //리뷰 수정
    updateReview = async (id, grade, comment, user_id) => {
        try{
            const updateReviewData = await Review.update({grade, comment,}, {where: {id}})
    
            return updateReviewData
        }catch(error) {
            res.status(445).json({ errorMessage: error.message });
        }
    }

    //리뷰 삭제
    deleteReview = async(id) => {
        const deleteReviewData = await Review.destroy({where: {id}})
        return deleteReviewData
    }

    //특정 id 찾기
    findReviewById = async(id) => {
        const review = await Review.findByPk(id)

        return review
    }
}

module.exports = ReviewRepository