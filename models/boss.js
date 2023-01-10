const Sequelize = require("sequelize");

class Boss extends Sequelize.Model {
  static initiate(sequelize) {
    Boss.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        phonenumber: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        money: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 100000,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // created_at, updated_at 으로 바뀜 (true면)
        modelName: "Boss",
        tableName: "Bosses",
        paranoid: false, // deletedAt 유저 삭제일 // ture면 soft delete임
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(models) {
    models.Boss.hasMany(models.Laundry, {
      foreignKey: "boss_id",
      sourceKey: "id",
    });
    models.Boss.hasMany(models.Review, {
      foreignKey: "boss_id",
      sourceKey: "id",
    });
  }
}

module.exports = Boss;
