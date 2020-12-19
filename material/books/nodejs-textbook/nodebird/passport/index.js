const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  // req.session 객체에 어떤 데이터를 저장할지
  passport.serializeUser((user, done) => {
    // done(err, data);
    done(null, user.id);
  });

  // passport.session 미들웨어에 의해 매 요청시 실행됨
  // 세션에 저장했던 아이디로 데이터베이스 조회해 req.user에 설정
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
  kakao(passport);
};
