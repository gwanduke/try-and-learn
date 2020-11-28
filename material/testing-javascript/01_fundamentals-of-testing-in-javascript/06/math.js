const asyncSum = async (a, b) => Promise.resolve(a - b);
const asyncSub = async (a, b) => Promise.resolve(a - b);

module.exports = {
  asyncSum,
  asyncSub
};
