import {Col, Row} from 'reactstrap'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from '../../stores/users'
import {PageTitle} from '../../components/core/Title'
import UserCard from '../../components/pages/userCard'
import Skeleton from 'react-loading-skeleton'

const Users = ({title}) => {
    const SKELETON_LOADERS = [1, 2, 3, 4, 5, 6, 7, 8]
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    const generateUsers = () => {
        return users?.length ? users.map(user => (
            <Col key={user?.id} sm={12} md={3}>
                <UserCard user={user}/>
            </Col>
        )) : SKELETON_LOADERS.map(item => (
            <Col key={item} sm={12} md={3}>
                <Skeleton height={400}/>
            </Col>
        ))
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    return (
        <Row>
            <Col sm={12}>
                <PageTitle>{title}</PageTitle>
            </Col>
            {generateUsers()}
        </Row>
    )
}

export default Users
