"use strict"

let userServices;
let userSelect;

document.addEventListener("DOMContentLoaded", () => {
    userServices = new UserServices();

    // Set variables
    userSelect = document.getElementById("userSelect");

    // Register events


    // Call these functions when the page loaded
    getAllUsers();
})

async function getAllUsers() {
    let allUsers = await userServices.getAll();
    
    allUsers.forEach(user => {
        let option = new Option(user.name, user.id);
        userSelect.appendChild(option);
    });
}

