"use strict"

let userServices, taskServices;


document.addEventListener("DOMContentLoaded", () => {
    userServices = new UserServices();
    taskServices = new TaskServices();

    // Set variables
    

    // Register events

    // Call these functions when the page loaded
    displayDetails();
})

async function displayDetails() {
    
    const urlParam = new URLSearchParams(location.search);
    let id = -1
    if (urlParam.has("id") == true) {
        id = urlParam.get("id");

        const currentTask = await taskServices.getTask(id);
        const currentUser = await getCurrentUser(currentTask.userid);
        
        document.getElementById("user").innerText = currentUser;
        document.getElementById("desc").innerText = currentTask.description;
        document.getElementById("category").innerText = currentTask.category;
        document.getElementById("priority").innerText = currentTask.priority;
        document.getElementById("deadline").innerText = currentTask.deadline;
    }
}

async function getCurrentUser(userid) {
    const users = await userServices.getAll();
    let name;

    users.forEach(user => {
        if (user.id == userid) name = user.name;
    });

    return name;
}
