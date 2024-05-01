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
function adminLogout() {
    sessionStorage.removeItem("admin");
    window.location.href = "../login.html";
}
const tableBody = document.querySelector("tbody");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://prodmart-backend.onrender.com/api/user`);
    if (data.status === 200) {
        const users = yield data.json();
        let listing = ``;
        users.forEach(({ _id, name, email, mobile, gender, isUser, state }, index) => listing += `
    <tr>
    <td>${name}</td>
    <td>${email}</td>
    <td>${mobile}</td>
    <td>${gender}</td>
    <td>${isUser ? "Yes" : "No"}</td>
    <td>
    <span style="display:inline-block">${state ? "Active" : "Deactive"}</span>
    </td>
    <td>
    <button onclick="changeUserState('${_id}')" type="button" class="btn btn-primary">${state ? "Deactivate user" : "Activate User"}</button>
    <button onclick="deleteUser('${_id}')" type="button" class="btn btn-danger">Delete</button>
    </td>
    </tr>
    `);
        tableBody.innerHTML = listing;
    }
    else {
        alert(`Error while fetching data!`);
    }
});
getUsers();
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'DELETE',
        };
        yield fetch(`https://prodmart-backend.onrender.com/api/user/${id}`, options);
        alert(`User deleted.`);
        getUsers();
    });
}
function changeUserState(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(`https://prodmart-backend.onrender.com/api/user/${id}`);
        const user = yield data.json();
        if (user.state === true) {
            const userState = {
                state: false
            };
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userState)
            };
            const data = yield fetch(`https://prodmart-backend.onrender.com/api/updatestate/${id}`, options);
            if (data.status === 200) {
                alert(`User deactivated successfully!`);
                getUsers();
            }
        }
        else if (user.state === false) {
            const userState = {
                state: true
            };
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userState)
            };
            const data = yield fetch(`https://prodmart-backend.onrender.com/api/updatestate/${id}`, options);
            if (data.status === 200) {
                alert(`User activated successfully!`);
                getUsers();
            }
        }
    });
}
