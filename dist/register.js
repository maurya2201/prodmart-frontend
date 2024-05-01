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
const form = document.querySelector("form");
let userGender;
const gender = document.getElementsByName("gender")[0];
gender.addEventListener('change', (event) => {
    userGender = event.target.value;
});
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const fullName = form[0].value;
    const userEmail = form[1].value;
    const userPassword = form[2].value;
    const mobile = parseInt(form[3].value);
    if (userPassword.length < 8) {
        alert(`Password should of 8 characters or greater than that!`);
    }
    else if (mobile.toString().length===10 && mobile.toString().length < 10) {
        alert(`Please enter valid mobile number please!`);
    }
    else {
        const user = {
            name: fullName,
            email: userEmail,
            password: userPassword,
            mobile: mobile,
            gender: userGender,
            otp: 0,
            isUser: false,
            state: false
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const newUser = yield fetch(`https://prodmart-backend.onrender.com/api/user`, options);
        if (newUser.status === 200) {
            alert(`Email already exists!`);
        }
        else {
            alert(`Registered successfully!`);
            sessionStorage.setItem("email", form[1].value);
            form[0].value = "";
            form[1].value = "";
            form[2].value = "";
            form[3].value = "";
            window.location.href = "./verifyemail.html";
        }
    }
}));
