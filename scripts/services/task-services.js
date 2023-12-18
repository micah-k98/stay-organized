class TaskServices {
    
    baseUrl = "http://localhost:8083/api/"

    async getAll(id) {
        return fetch(`${this.baseUrl}todos/byuser/${id}`).then(response => response.json());
    }
}