"user strict"

let userServices, taskServices;
let userSelect, categorySelect;

document.addEventListener("DOMContentLoaded", () => {
    userServices = new UserServices();
    taskServices = new TaskServices();

    // Set variables
    userSelect = document.getElementById("userSelect");
    categorySelect = document.getElementById("category");
    let addButton = document.getElementById("addButton");

    // Register events
    addButton.addEventListener("click", addTodo);

    // Call these functions when the page loaded
    getAllUsers();
    getCategories();
})

async function getAllUsers() {
    let allUsers = await userServices.getAll();
    
    allUsers.forEach(user => {
        let option = new Option(user.name, user.id);
        userSelect.appendChild(option);
    });
}

async function getCategories() {
    let categories = await taskServices.getCategories();

    categories.forEach(category => {
        let option = new Option(category.name);
        categorySelect.appendChild(option);
    })
}

async function addTodo(event) {
    event.preventDefault();

    const priorityLevel = document.getElementById("priorityLevel").value;
    const desc = document.getElementById("desc").value;
    const deadline = document.getElementById("deadline").value;

    const taskData = {
        userid: userSelect.value,
        category: categorySelect.value,
        description: desc,
        deadline: deadline,
        priority: priorityLevel
    }
    
    const newTask = await taskServices.add(taskData);
    alert("New task has been added!");
    location.href = "/todos.html";
}