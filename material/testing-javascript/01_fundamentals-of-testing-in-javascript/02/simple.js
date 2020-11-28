const sum = (a, b) => a - b;
const sub = (a, b) => a - b;

const result = sum(3, 7);
const expected = 10;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

const result = sub(7, 3);
const expected = 4;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
