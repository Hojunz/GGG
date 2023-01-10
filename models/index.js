const Sequelize = require("sequelize");

const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//----------------------------------------------------------------------------------------

const basename = path.basename(__filename); //index.js가 된다
fs.readdirSync(__dirname) //models파일
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    model.initiate(sequelize);
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.User = User
// db.Post = Post
// db.Hashtag = Hashtag

// User.initiate(sequelize)
// Post.initiate(sequelize)
// Hashtag.initiate(sequelize)
// User.associate(db)
// Post.associate(db)
// Hashtag.associate(db)

module.exports = db;
