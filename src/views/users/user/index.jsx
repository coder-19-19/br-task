import {Link, useParams} from 'react-router-dom'
import text from './text.json'
import {Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
import {PageTitle} from '../../../components/core/Title'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addPost, getUser} from '../../../stores/users'
import {AiOutlinePlus} from 'react-icons/ai'
import {IoArrowBack} from 'react-icons/io5'
import {routes} from '../../../routes'
import {Formik} from 'formik'
import {addPostSchema} from '../../../utils/validation'
import PostCard from '../../../components/pages/postCard'
import Skeleton from 'react-loading-skeleton'

const User = () => {
    const SKELETON_LOADERS = [1, 2, 3, 4, 5, 6, 7, 8]
    const {id} = useParams()
    const [user, setUser] = useState({})
    const [modalIsActive, setModalIsActive] = useState(false)
    const posts = useSelector(state => state.users.posts)
    const dispatch = useDispatch()

    const initialFormValues = {
        title: '',
        body: ''
    }

    const toggleModal = () => {
        setModalIsActive(!modalIsActive)
    }

    const getData = async() => {
        const data = await dispatch(getUser(id))
        setUser(data)
    }

    const generatePosts = () => {
        return posts?.length ? posts?.map(post => (
            <Col key={post?.id} sm={12}>
                <PostCard post={post} userId={user?.id}/>
            </Col>
        )) : SKELETON_LOADERS.map(item => (
            <Skeleton key={item} height={60}/>
        ))
    }

    const userAddPost = async(values, {setFieldError, resetForm}) => {
        await dispatch(addPost(values, resetForm, setFieldError))
        toggleModal()
    }

    useEffect(() => {
        getData()
        document.title = user?.name
    }, [id])
    return (
        <Row className="justify-content-center gap-4">
            <Modal isOpen={modalIsActive} toggle={toggleModal}>
                <ModalHeader>{text.add_post}</ModalHeader>
                <ModalBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialFormValues}
                        onSubmit={userAddPost}
                        validationSchema={addPostSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {({values, handleChange, handleSubmit, errors}) => (
                            <Form onSubmit={e => e.preventDefault()}>
                                <FormGroup>
                                    <Label for="title">{text.title}</Label>
                                    <Input invalid={errors.title} type="text" name="title" id="title"
                                        value={values.title}
                                        onChange={handleChange}/>
                                    <FormText color="danger">{errors.title}</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="body">{text.body}</Label>
                                    <Input invalid={errors.body} type="textarea" name="body" id="body"
                                        value={values.body}
                                        onChange={handleChange}/>
                                    <FormText color="danger">{errors.body}</FormText>
                                </FormGroup>
                                <div className="d-flex flex-row-reverse gap-2">
                                    <Button color="primary" onClick={handleSubmit}>{text.save}</Button>
                                    <Button color="secondary" onClick={toggleModal}>{text.cancel}</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>
            <Col sm={12}>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={routes.users.path} className="icon btn btn-primary">
                        <IoArrowBack/>
                    </Link>
                    <PageTitle>{user?.name || <Skeleton height={40}/>}</PageTitle>
                    <span className="icon btn btn-primary" onClick={toggleModal}>
                        <AiOutlinePlus/>
                    </span>
                </div>
            </Col>
            {generatePosts()}
        </Row>
    )
}

export default User
