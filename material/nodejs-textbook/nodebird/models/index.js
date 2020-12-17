const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

//----- Relation -----//
db.User.hasMany(db.Post);
db.User.belongsToMany(db.User, {
  foreignKey: "followingId",
  as: "Followers",
  through: "Follow",
});
db.User.belongsToMany(db.User, {
  foreignKey: "followerId", // 관계 테이블 내 컬럼명
  as: "Followings", // JOIN 작업시 사용하는 이름
  through: "Follow", // 관계 테이블
});

db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });

db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });

module.exports = db;
