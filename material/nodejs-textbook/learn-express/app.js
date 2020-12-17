var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // 템플릿 파일이 위치한 경로 지정
app.set("view engine", "pug");

app.use((req, res, next) => {
  console.log("---------------");
  console.log(req.url, "미들웨어");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("__SECRET_CODE__"));
app.use(
  // req.session을 생성, req.sessionID로 ID 조회 가능
  session({
    resave: false, // 요청이 왔을 때 세션에 수정사항이 없더라도 다시 저장?
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 저장?
    secret: "__SECRET_CODE__",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(flash()); // req 객체에 flash 메서드 추가 - 설정: `req.flash(키, 값)`, 조회: `req.flash(키)`
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
