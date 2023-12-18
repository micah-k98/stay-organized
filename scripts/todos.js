"use strict"

let userServices, taskServices;
let userSelect, allTasksContainer, toDoTaskTemplate;

document.addEventListener("DOMContentLoaded", () => {
    userServices = new UserServices();
    taskServices = new TaskServices();

    // Set variables
    userSelect = document.getElementById("userSelect");
    allTasksContainer = document.getElementById("allTasksContainer");
    toDoTaskTemplate = document.getElementById("toDoTaskTemplate");

    // Register events
    userSelect.addEventListener("change", getUserTasks);

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

async function getUserTasks(event) {
    event.preventDefault();

    let allTasks = await taskServices.getAll(userSelect.value);
    allTasksContainer.innerText = "";

    if (allTasks.length != 0) {
        allTasks.forEach(task => {
            displayTask(task);
        })
    }
    else if (allTasks.length == 0 && userSelect.value != "0") {
        const h5 = document.createElement("h5");
        h5.innerText = "There's no task assigned."
        h5.classList.add("text-center");
        h5.classList.add("mt-3");
        allTasksContainer.appendChild(h5);
    }
}

function displayTask(task) {
    let card = toDoTaskTemplate.content.cloneNode(true);
    // card.getElementById("category").innerText = task.category;
    card.getElementById("desc").innerText = task.description;
    card.getElementById("deadline").innerText = task.deadline;
    if (task.completed == true) card.getElementById("status").innerText = "✔";
    else if (task.completed == false) card.getElementById("status").innerText = "❌"

    allTasksContainer.appendChild(card);
}

