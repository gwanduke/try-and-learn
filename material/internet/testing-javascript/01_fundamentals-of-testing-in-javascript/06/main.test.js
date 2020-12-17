// node --require ./setup-globals.js ./main.test.js

const { asyncSum, asyncSub } = require("./math");

test("#asyncSum adds numbers", async () => {
  const result = await asyncSum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("#asyncSub subtracts numbers", async () => {
  const result = await asyncSub(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
