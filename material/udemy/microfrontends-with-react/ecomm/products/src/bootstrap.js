import faker from "faker";

const mount = (el) => {
  let products = "";

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }

  el.innerHTML = products;
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("dev-products");
  if (root) {
    mount(root);
  }
}

// 컨테이너가 사용하기 위함
export { mount };
