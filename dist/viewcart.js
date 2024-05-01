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
const viewCartAll = JSON.parse((_a = localStorage.getItem("cart")) !== null && _a !== void 0 ? _a : "[]");
const totalPrice = document.getElementById("totalprice");
function total() {
    let price = 0;
    for (let i = 0; i < viewCartAll.length; i++) {
        price += viewCartAll[i].totalprice;
    }
    totalPrice.textContent = `Total price:$${price}`;
}
total();
const tableListing = document.querySelector("tbody");
const viewCarListing = () => {
    let list = ``;
    viewCartAll.map(({ totalprice, title, thumbnail, quantity }, index) => list += `
    <tr>
    <td>${title}</td>
    <td><img src="${thumbnail}" height="100px" width="100px"></td>
    <td>$${totalprice}</td>
    <td>
    <button onclick="removeOne(${index})" class="btn btn-info">-</button>
    ${quantity}
    <button onclick="addOne(${index})" class="btn btn-info">+</button>
    </td>
    <td>
    <button onclick="removeItem(${index})" class="btn btn-danger">Remove</button>
    </td>
    </tr>
    `);
    tableListing.innerHTML = list;
};
viewCarListing();
function addOne(id) {
    viewCartAll[id].quantity++;
    viewCartAll[id].totalprice = viewCartAll[id].totalprice + viewCartAll[id].price;
    localStorage.setItem("cart", JSON.stringify(viewCartAll));
    viewCarListing();
    total();
}
function removeOne(id) {
    if (viewCartAll[id].quantity <= 1) {
        const deleted = viewCartAll.filter((element, index) => index != id);
        localStorage.setItem("cart", JSON.stringify(deleted));
        location.reload();
    }
    else {
        viewCartAll[id].quantity--;
        viewCartAll[id].totalprice = viewCartAll[id].totalprice - viewCartAll[id].price;
        localStorage.setItem("cart", JSON.stringify(viewCartAll));
        viewCarListing();
        total();
    }
}
if (viewCartAll.length === 0) {
    alert(`Cart is empty`);
    setTimeout(() => {
        window.location.href = "../homepage.html";
    });
}
function removeItem(id) {
    const deleted = viewCartAll.filter((element, index) => index != id);
    localStorage.setItem("cart", JSON.stringify(deleted));
    alert(`Product removed successfully!`);
    location.reload();
}
function placeAllOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(viewCartAll)
        };
        const placeOrder = yield fetch(`https://prodmart-backend.onrender.com/api/order`, options);
        if (placeOrder.status === 200) {
            localStorage.removeItem("cart");
            alert(`Order placed successfully.`);
            location.reload();
        }
        else {
            alert(`Error while placing order!`);
        }
    });
}
