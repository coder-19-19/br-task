import text from './text.json'
import Users from './views/users'
import User from './views/users/user'
import Post from './views/post'

const routeItem = (title, path, component) => {
    return {
        title,
        path,
        component
    }
}
const routes = {
    users: routeItem(text.users, '/', <Users title={text.users}/>),
    user: routeItem(text.users, '/user/:id', <User title={text.users}/>),
    post: routeItem(text.post, '/user/:id/:postId', <Post title={text.post}/>)
}

const routeArr = Object.values(routes)

export {
    routes,
    routeArr
}
