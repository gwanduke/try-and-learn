const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

const router = express.Router();

router.get("/profile", isLoggedIn, (req, res) => {
  res.locals.followingCount = ((req.user && req.user.Followings) || []).length;
  res.locals.followerCount = ((req.user && req.user.Followers) || []).length;

  res.render("profile", { title: "내 정보 - NodeBird", user: req.user });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeBird",
    user: req.user,
    joinError: req.flash("joinError"),
  });
});

router.get("/", (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.locals.followingCount = (
        (req.user && req.user.Followings) ||
        []
      ).length;
      res.locals.followerCount = (
        (req.user && req.user.Followers) ||
        []
      ).length;

      res.render("main", {
        title: "NodeBird",
        twits: posts,
        user: req.user,
        loginError: req.flash("loginError"),
        followings: (req.user && req.user.Followings) || [],
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;