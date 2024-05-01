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
const verifyForm = document.querySelector("form");
verifyForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const verify = {
        otp: verifyForm[0].value
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verify)
    };
    const verifyUser = yield fetch(`https://prodmart-backend.onrender.com/api/verifyuser/`, options);
    if (verifyUser.status === 200) {
        alert(`Email Verified`);
        window.location.href = "login.html";
        sessionStorage.removeItem("email");
    }
    else if (verifyUser.status === 404) {
        alert(`Invalid otp!!`);
    }
}));
