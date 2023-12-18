class UserServices {

    baseUrl = "http://localhost:8083/api/";

    async getAll() {
        return fetch(`${this.baseUrl}users`).then(response => response.json());
    }
}