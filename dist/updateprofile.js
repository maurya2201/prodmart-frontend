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
const userId = sessionStorage.getItem("id");
const updateProfile = document.querySelector("form");
fetch(`https://prodmart-backend.onrender.com/api/user/${userId}`)
    .then((res) => res.json())
    .then((response) => {
    updateProfile[0].value = response.name;
    updateProfile[1].value = response.email;
    updateProfile[2].value = response.mobile;
});
updateProfile.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        event.preventDefault();
        const details = {
            name: updateProfile[0].value,
            email: updateProfile[1].value,
            mobile: parseInt(updateProfile[2].value)
        };
        if (isNaN(details.mobile) || details.mobile.toString().length < 10) {
            alert(`Please enter valid mobile number please!`);
        }
        else {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            };
            const update = yield fetch(`https://prodmart-backend.onrender.com/api/user/${userId}`, options);
            if (update.status === 200) {
                alert(`Profile updated!`);
                window.location.href = "../homepage.html";
            }
            else {
                alert(`Error will updating data.`);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
