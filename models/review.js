const Sequelize = require('sequelize');

class Review extends Sequelize.Model{
    static initiate(sequelize){
        Review.init({
            grade:{
                type: Sequelize.INTEGER(100),
                allowNull: true,
            },
            comment: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // createdAt, updatedAt
            underscored: false, // created_at, updated_at 으로 바뀜 (true면)
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: false, // deletedAt 유저 삭제일 // ture면 soft delete임
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(models) {
        models.Review.belongsTo(models.User, {foreignKey: "user_id", targetKey: "id",});
        models.Review.belongsTo(models.Boss, {foreignKey: "boss_id", targetKey: "id",});
    }
}

module.exports = Review