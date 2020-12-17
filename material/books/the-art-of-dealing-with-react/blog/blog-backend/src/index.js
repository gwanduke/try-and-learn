require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');

const { PORT, MONGO_URI } = process.env;

const api = require('./api');
// const createFakeData = require('./createFakeData');
const jwtMiddleware = require('./lib/jwtMiddleware');

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
