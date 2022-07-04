import axios from './index'

class Users {
    getUsers() {
        return axios.get('users')
    }

    getUser(id) {
        return axios.get(`users/${id}`)
    }

    updateUser(id, data) {
        return axios.put(`users/${id}`, data)
    }
}

export default new Users()
