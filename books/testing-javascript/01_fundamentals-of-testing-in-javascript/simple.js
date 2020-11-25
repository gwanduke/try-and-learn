const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;
const asyncSum = (a, b) => Promise.resolve(a - b);

// let result = sum(3, 7);
// let expected = 10;
// if (result !== expected) {
//   throw new Error(`${result} is not equal to ${expected}`);
// }

// 개선된 버전
test("subtract subracts numbers", () => {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});

test("asyncSum sum numbers", async () => {
  const result = await asyncSum(1, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
