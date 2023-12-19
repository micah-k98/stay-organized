"use strict"

let userServices;

document.addEventListener("DOMContentLoaded", ()=> {
    userServices = new UserServices();

    // Set variables
    const addButton = document.getElementById("addButton");

    // Register events
    addButton.addEventListener("click", addNewUser);
})

async function addNewUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const userInfo = {
        name: name,
        username: userName,
        password: password
    }

    const response = await userServices.add(userInfo);
    if (response.status == 400) {
        alert("Missing data! Please try again.")
    }
    else if (response.status == 403) {
        alert("Username is already taken. Please try again.")
    }
    else if (response.status == 201 || response.status == 200) {
        const userData = await response.json();
        console.log(userData);
        location.href = "/index.html"
    }
}