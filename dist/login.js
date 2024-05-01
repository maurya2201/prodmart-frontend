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
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        event.preventDefault();
        const email = loginForm[0].value;
        const password = loginForm[1].value;
        if (email.includes("admin@gmail.com") && password.includes("admin")) {
            alert(`Login succcesfully!`);
            sessionStorage.setItem("admin", "true");
            window.location.href = "../admin/admin.html";
        }
        else {
            const userInfo = {
                email: email,
                password: password
            };
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            };
            const user = yield fetch(`https://prodmart-backend.onrender.com/api/login`, options);
            if (user.status === 200) {
                const data = yield user.json();
                if (data.isUser === true && data.state === true) {
                    alert(`Login successfully!`);
                    sessionStorage.setItem("id", data._id);
                    window.location.href = "homepage.html";
                }
                else if (data.isUser === true && data.state === false) {
                    alert(`Contact admin to activate your account!`);
                }
                else {
                    alert(`User not verifed!`);
                }
            }
            else if (user.status === 404) {
                alert(`User not found!`);
            }
            else if (user.status === 400) {
                alert(`Invalid password!`);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
