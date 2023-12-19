"use strict"

let userServices, taskServices;
let currentTask;

document.addEventListener("DOMContentLoaded", () => {
    userServices = new UserServices();
    taskServices = new TaskServices();

    // Set variables
    const saveButton = document.getElementById("saveButton");
    
    // Register events
    saveButton.addEventListener("click", saveButtonClicked);

    // Call these functions when the page loaded
    displayDetails();
})

async function displayDetails() {
    const urlParam = new URLSearchParams(location.search);
    let id = -1
    if (urlParam.has("id") == true) {
        id = urlParam.get("id");

        currentTask = await taskServices.getTask(id);
        const currentUser = await getCurrentUser(currentTask.userid);
        
        document.getElementById("user").innerText = currentUser;
        document.getElementById("desc").innerText = currentTask.description;
        document.getElementById("category").innerText = currentTask.category;
        document.getElementById("priority").innerText = currentTask.priority;
        document.getElementById("deadline").innerText = currentTask.deadline;

        if (currentTask.completed == false) {
            document.getElementById("no").checked = true;
            document.getElementById("yes").checked = false;
        }
        else {
            document.getElementById("no").checked = false;
            document.getElementById("yes").checked = true;
        }
    }
    else location.href = "/todos.html"
}

async function getCurrentUser(userid) {
    const users = await userServices.getAll();
    let name;

    users.forEach(user => {
        if (user.id == userid) name = user.name;
    });

    return name;
}

async function saveButtonClicked() {
    const radioButtons = document.getElementsByName("isCompletedRadio");

    const details = {
        userid: currentTask.userid,
        category: currentTask.category,
        description: currentTask.description,
        deadline: currentTask.deadline,
        priority: currentTask.priority
    }

    radioButtons.forEach(radio => {
        if (currentTask.completed == false && (radio.id == "yes" && radio.checked == true)) {
            details.completed = true;
            taskServices.changeCompletedStatus(currentTask.id, details);
        }
        else if (currentTask.completed == true && (radio.id == "no" && radio.checked == true)) {
            details.completed = false;
            taskServices.changeCompletedStatus(currentTask.id, details);
        }
    })

    location.href = "/todos.html";
}