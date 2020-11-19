export default {
  updateNumber: (store) => {
    const number = document.getElementById("number");
    number.innerHTML = store.number;
  },
};
