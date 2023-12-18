class TaskServices {
    
    baseUrl = "http://localhost:8083/api/"

    async getAll(id) {
        return fetch(`${this.baseUrl}todos/byuser/${id}`).then(response => response.json());
    }

    async getCategories() {
        return fetch(`${this.baseUrl}categories`).then(response => response.json());
    }

    async add(taskData) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(taskData),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }

        return fetch(`${this.baseUrl}todos`, requestInfo).then(response => response.json());
    }
}