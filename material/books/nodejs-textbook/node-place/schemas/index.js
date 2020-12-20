const mongoose = require("mongoose");

const MONGO_URL = `mongodb://localhost:27017/admin`;

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      MONGO_URL,
      {
        dbName: "nodeplace",
      },
      (error) => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });

  require("./favorite");
  require("./history");
};