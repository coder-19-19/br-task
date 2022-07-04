import {createSlice} from '@reduxjs/toolkit'
import Users from '../api/users'
import Posts from '../api/posts'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        posts: []
    },
    reducers: {
        setUsers: (state, {payload}) => {
            state.users = payload
        },
        updateUserArray: (state, {payload}) => {
            const newUsers = state.users
            const index = state.users.findIndex(item => item?.id === payload.id)
            newUsers[index] = payload.formData
            state.users = newUsers
        },
        setPosts: (state, {payload}) => {
            state.posts = payload
        },
        addPostArray: (state, {payload}) => {
            state.posts = [payload, ...state.posts]
        },
        updatePostArray: (state, {payload}) => {
            const newPosts = state.posts
            const index = state.posts.findIndex(item => item?.id === payload.id)
            newPosts[index] = payload.formData
            state.posts = newPosts
        },
        deletePost: (state, {payload}) => {
            state.posts = [...state.posts.filter(post => post?.id !== payload)]
        }
    }
})

export const {setUsers, setPosts, updateUserArray, addPostArray, updatePostArray, deletePost} = usersSlice.actions

export default usersSlice.reducer

export const getUsers = () => {
    return async dispatch => {
        try {
            const {data} = await Users.getUsers()
            dispatch(setUsers(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getUser = id => {
    return async dispatch => {
        try {
            const [userData, postData] = await Promise.all([
                Users.getUser(id),
                Posts.getUserPosts(id)
            ])
            dispatch(setPosts(postData?.data))
            return userData?.data
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateUser = (id, formData, resetForm) => {
    return async dispatch => {
        try {
            await Users.updateUser(id, formData)
            dispatch(updateUserArray({id, formData}))
            resetForm()
        } catch (e) {
            console.log(e)
        }
    }
}

export const addPost = (formData, resetForm) => {
    return async dispatch => {
        try {
            const {data} = await Posts.addPost(formData)
            resetForm()
            dispatch(addPostArray(data))
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const updatePost = (id, formData) => {
    return async dispatch => {
        try {
            const {data} = await Posts.updatePost(id, formData)
            dispatch(updatePostArray({id, formData}))
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const getPost = (id, postId) => {
    return async dispatch => {
        try {
            const [userData, postData] = await Promise.all([
                Users.getUser(id),
                Posts.getUserPost(postId)
            ])
            return {
                user: userData?.data,
                post: postData?.data
            }
        } catch (e) {
            console.log(e)
        }
    }
}
