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

async function test(description, callback) {
  try {
    await callback();
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
