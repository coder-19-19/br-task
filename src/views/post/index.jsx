import {Link, useParams} from 'react-router-dom'
import {routes} from '../../routes'
import {IoArrowBack} from 'react-icons/io5'
import {PageTitle} from '../../components/core/Title'
import {Col, Row} from 'reactstrap'
import {replaceParams} from '../../utils/navigation'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getPost} from '../../stores/users'

const Post = () => {
    const {id, postId} = useParams()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})
    const [postData, setPostData] = useState({})
    const getData = async() => {
        const {user, post} = await dispatch(getPost(id, postId))
        setUserData(user)
        setPostData(post)
    }

    useEffect(() => {
        getData()
    }, [id, postId])

    return (
        <Row>
            <Col sm={12}>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={replaceParams(routes.user.path, ':id', id)} className="icon btn btn-primary">
                        <IoArrowBack/>
                    </Link>
                    <PageTitle>{userData?.name}</PageTitle>
                    <span/>
                </div>
            </Col>
        </Row>
    )
}

export default Post
