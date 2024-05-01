"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const productId = new URLSearchParams(window.location.search);
const cart = JSON.parse((_a = localStorage.getItem("cart")) !== null && _a !== void 0 ? _a : "[]");
const viewDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield fetch(`https://dummyjson.com/products/${productId.get("id")}`);
    const details = yield product.json();
    const { title, price, thumbnail, description } = details;
    let list = `
  <div class="card" style="width:20rem;">
  <img src="${thumbnail}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <h5 class="card-title">$${price}</h5>
    <p class="card-text">${description}</p>
    <button onclick="addToCart(${productId.get("id")})" class="btn btn-danger">Add to Cart</button>
    <a href="../homepage.html" class="btn btn-primary">Homepage</a>
  </div>
</div>  
  `;
    document.body.innerHTML = list;
});
viewDetails();
function addToCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(`https://dummyjson.com/products/${id}`);
        const product = yield data.json();
        const { title, price, thumbnail } = product;
        const item = {
            uid: sessionStorage.getItem("id"),
            id: id,
            title: title,
            price: price,
            totalprice: price,
            thumbnail: thumbnail,
            quantity: 1
        };
        const findId = cart.findIndex((element) => element.id == id);
        if (findId != -1) {
            cart[findId].quantity++;
            cart[findId].totalprice = cart[findId].totalprice + cart[findId].price;
            alert(`Quantity addded successfully!`);
        }
        else {
            cart.push(item);
            alert(`Item added successfully!`);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    });
}
