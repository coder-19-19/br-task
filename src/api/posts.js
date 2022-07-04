import axios from './index'

class Posts {
    getUserPosts(id) {
        return axios.get(`users/${id}/posts`)
    }

    addPost(data) {
        return axios.post('posts', data)
    }

    updatePost(id, data) {
        return axios.put(`posts/${id}`, data)
    }

    getUserPost(postId) {
        return axios.get(`posts/${postId}`)
    }
}

export default new Posts()
