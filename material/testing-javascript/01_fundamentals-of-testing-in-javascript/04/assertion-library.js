const { sum, sub } = require("./math");

test("#sum subtracts numbers", () => {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("#sub subtracts numbers", () => {
  const result = sub(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});

function test(description, callback) {
  try {
    callback();
    console.log(`✅ ${description}`);
  } catch (err) {
    console.error(`❌ ${description}`);
    console.error(err);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
}
