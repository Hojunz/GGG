const ReviewService = require('../service/reviews.service')

class ReviewsController {
    reviewService = new ReviewService()

    //리뷰 작성
    createReview = async(req, res, next) => {
        try{
            const {grade, comment} = req.body
            const {laundryId} = req.params
            const User = res.locals.user.id

            if(!grade) { 
                res.status(400).send({errorMessage: '점수를 입력해주세요!'})
            }
            if(!comment) {
                res.status(400).send({errorMessage: '내용을 입력해주세요!'})
            }

            await this.reviewService.createReview(grade, comment, User, laundryId)

            res.status(201).send({message: '리뷰 작성 완료!'})

        }catch(error) {
            res.status(444).json({ errorMessage: error.message });
        }
    }
    // 리뷰 조회 (지금 로그인 된 사용자것만 불러오기, 에러처리)
    getReview = async(req, res, next) => {
        const {user_id} = req.params

        const review = await this.reviewService.getReview(user_id)
    
        res.status(200).json({data: review})
    }

    //리뷰 수정 (리뷰 작성한 유저만 고칠수 있게 바꾸기)
    updateReview = async(req, res, next) => {
        try{
            const {reviewId} = req.params
            const {grade, comment} = req.body
            const User = res.locals.user.id
            
            // if(User !== user_id) {
            //     res.status(400).send({errorMessage: '리뷰를 작성한 유저가 아닙니다!'})
            // }
    
            await this.reviewService.updateReview(reviewId, grade, comment)
            
            res.status(200).send({message: '리뷰 수정 완료!'})
        } catch(error) {
            res.status(444).json({ errorMessage: error.message });
        }
    }
    //리뷰 삭제
    deleteReview = async(req, res, next) => {
        try{
            const{reviewId} = req.params
            const User = res.locals.user.id

            //에러처리

            await this.reviewService.deleteReview(reviewId)
            res.status(200).send({message: "리뷰 삭제 완료!"})
        }catch(error){
            res.status(444).json({ errorMessage: error.message });
        }
    }
}

module.exports = ReviewsController;