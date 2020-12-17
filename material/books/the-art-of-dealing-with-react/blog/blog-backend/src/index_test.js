const Koa = require('koa');

const app = new Koa();

// app.use는 미들웨어이며 여러개를 작성할 경우, 작성 순서대로 처리됨
// ctx는 요청과 응답에 대한 내용을 가짐
app.use(async (ctx, next) => {
  console.log(1);
  ctx.body = 'hello world';
  await next(); // next는 promise를 반환하며 다음 미들웨어의 처리가 끝나야 resolve (이후의 모든 미들웨어가 처리되어야함)
  console.log(1, 'end');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
