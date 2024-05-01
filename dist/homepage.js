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
const cartLength = JSON.parse((_a = localStorage.getItem("cart")) !== null && _a !== void 0 ? _a : "[]");
const viewCart = document.getElementById("viewcart");
viewCart.textContent = `VIEW CART(${cartLength.length})`;
const search = document.getElementById("search");
const loader = document.getElementById("loader");
function userLogout() {
    sessionStorage.removeItem("id");
    window.location.href = "../login.html";
}
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://dummyjson.com/products?limit=100`);
    const data = yield response.json();
    const products = data.products;
    let product = ``;
    products.forEach(({ id, title, thumbnail }) => product += `
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
    document.getElementsByClassName("row")[0].innerHTML = product;
    loader === null || loader === void 0 ? void 0 : loader.remove();
});
getProducts();
function viewDetail(id) {
    window.location.href = `../product/viewdetail.html?id=${id}`;
}
const category = document.getElementsByName("category")[0];
category.addEventListener("change", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const value = event.target.value;
    if (value === "CATEGORY") {
        getProducts();
    }
    else {
        const response = yield fetch(`https://dummyjson.com/products?limit=100`);
        if (response.status === 200) {
            const data = yield response.json();
            const products = data.products;
            const category = products.filter(({ category }) => value === category);
            let product = ``;
            category.forEach(({ id, title, thumbnail }) => product += `
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
            document.getElementsByClassName("row")[0].innerHTML = product;
        }
        else if (response.status === 404) {
            alert(`Data not found!`);
        }
    }
}));
search.addEventListener("keyup", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const value = event.target.value;
    const response = yield fetch(`https://dummyjson.com/products?limit=100`);
    if (response.status === 200) {
        const data = yield response.json();
        const products = data.products;
        const search = products.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()));
        let product = ``;
        search.forEach(({ id, title, thumbnail }) => product += `
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
        document.getElementsByClassName("row")[0].innerHTML = product;
    }
    else if (response.status === 404) {
        alert(`Data not found!`);
    }
}));
