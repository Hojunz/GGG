const Sequelize = require("sequelize");

class Laundry extends Sequelize.Model {
  static initiate(sequelize) {
    Laundry.init(
      {
        phonenumber: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 10000,
        },
        status: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: '대기중',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Laundry",
        tableName: "Laundries",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    models.Laundry.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    models.Laundry.belongsTo(models.Boss, {
      foreignKey: "boss_id",
      targetKey: "id",
    });
    models.Laundry.hasOne(models.Review, { foreignKey: "laundry_id" });
  }
}

module.exports = Laundry;
