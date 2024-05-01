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
const forgotPasswordForm = document.querySelector("form");
const submitEmail = document.getElementById("email");
const submitOtp = document.getElementById("otp");
const submitPassword = document.getElementById("password");
forgotPasswordForm[0].setAttribute("type", "email");
submitEmail.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = forgotPasswordForm[0].value;
    const userEmail = {
        email: email
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userEmail)
    };
    const sentEmail = yield fetch(`https://prodmart-backend.onrender.com/api/forgotpassword`, options);
    if (sentEmail.status === 200) {
        alert(`Otp sent to your email!`);
        forgotPasswordForm[0].value = "";
        forgotPasswordForm[0].setAttribute("type", "number");
        submitEmail.style.display = "none";
        submitOtp.style.display = "block";
    }
    else if (sentEmail.status === 404) {
        alert(`Email not found!.`);
    }
    else if (sentEmail.status === 400) {
        alert(`User not verified!`);
        window.location.href = "../login.html";
    }
}));
submitOtp.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = forgotPasswordForm[0].value;
    const userOtp = {
        otp: parseInt(otp)
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userOtp)
    };
    const verifyUser = yield fetch(`https://prodmart-backend.onrender.com/api/verifyuser/`, options);
    if (verifyUser.status === 200) {
        alert(`Enter your password again!`);
        const data = yield verifyUser.json();
        sessionStorage.setItem("fpid", data);
        forgotPasswordForm[0].value = "";
        forgotPasswordForm[0].setAttribute("type", "password");
        submitOtp.style.display = "none";
        submitPassword.style.display = "block";
    }
    else if (verifyUser.status === 404) {
        alert(`Invalid otp!`);
    }
}));
submitPassword.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const password = forgotPasswordForm[0].value;
    const userPassword = {
        password: password
    };
    const id = sessionStorage.getItem("fpid");
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPassword)
    };
    const update = yield fetch(`https://prodmart-backend.onrender.com/api/updatepassword/${id}`, options);
    if (update.status === 200) {
        alert(`Password changed successfully!`);
        sessionStorage.removeItem("fpid");
        window.location.href = "../login.html";
    }
    else {
        alert(`Error while updating password!`);
    }
}));
