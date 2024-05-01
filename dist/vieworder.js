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
const id = sessionStorage.getItem("id");
const viewOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://prodmart-backend.onrender.com/api/vieworder/${id}`);
    if (response.status === 200) {
        const data = yield response.json();
        let order = ``;
        data.forEach(({ title, thumbnail, totalprice, quantity }) => order += `
    <div class="col-3">
      <div class="card" style="width: 18rem;">
  <img height="100px" width="200px" src="${thumbnail}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">Name: ${title}</h6>
    <h6 class="card-title">Price: $${totalprice}</h6>
    <h6 class="card-title">Quantity: ${quantity}</h6>
  </div>
</div>
</div>`);
        document.querySelector(".row").innerHTML = order;
    }
    else if (response.status === 404) {
        alert(`Orders not found!`);
        window.location.href = "../homepage.html";
    }
    else {
        alert(`Error while fetching data!`);
    }
});
viewOrder();
