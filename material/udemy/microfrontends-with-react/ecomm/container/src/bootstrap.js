// Integration Process
import { mount as productsMount } from "products/ProductsIndex";
import { mount as cartMount } from "cart/CartShow";

console.log("container!");

productsMount(document.getElementById("my-products"));
cartMount(document.getElementById("my-cart"));
