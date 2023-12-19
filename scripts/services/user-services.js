class UserServices {

    baseUrl = "http://localhost:8083/api/";

    async getAll() {
        return fetch(`${this.baseUrl}users`).then(response => response.json());
    }

    async add(userInfo) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }

        return fetch(`${this.baseUrl}users`, requestInfo)
    }
}