import {Button, Card, CardBody, CardHeader, Form, FormGroup, FormText, Input, Label} from 'reactstrap'
import {BiTrash} from 'react-icons/bi'
import {BsArrowRightCircleFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {replaceMultiParams} from '../../../utils/navigation'
import {routes} from '../../../routes'
import {useDispatch} from 'react-redux'
import {deletePost, updatePost} from '../../../stores/users'
import {useState} from 'react'
import {addPostSchema} from '../../../utils/validation'
import text from './text.json'
import {Formik} from 'formik'

const PostCard = ({post, userId}) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const userDeletePost = () => {
        dispatch(deletePost(post?.id))
    }

    const userUpdatePost = async(values) => {
        await dispatch(updatePost(post?.id, values))
        toggleEditMode()
    }

    return (
        editMode ? (
            <Card>
                <CardHeader>
                    {text.update_post}
                </CardHeader>
                <CardBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={post}
                        onSubmit={userUpdatePost}
                        validationSchema={addPostSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {({values, handleChange, handleSubmit, errors}) => (
                            <Form onSubmit={e => e.preventDefault()}>
                                <FormGroup>
                                    <Label for={`title-${post?.id}`}>{text.title}</Label>
                                    <Input invalid={errors.title} type="text" name="title" id={`title-${post?.id}`}
                                        value={values.title}
                                        onChange={handleChange}/>
                                    <FormText color="danger">{errors.title}</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`body-${post?.id}`}>{text.body}</Label>
                                    <Input invalid={errors.body} type="textarea" name="body" id={`body-${post?.id}`}
                                        value={values.body}
                                        onChange={handleChange} aria-rowcount={5} aria-colcount={5}/>
                                    <FormText color="danger">{errors.body}</FormText>
                                </FormGroup>
                                <div className="d-flex flex-row-reverse gap-2">
                                    <Button color="primary" onClick={handleSubmit}>{text.save}</Button>
                                    <Button color="secondary" onClick={toggleEditMode}>{text.cancel}</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        ) : (
            <Card onDoubleClick={toggleEditMode}>
                <CardBody className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-1">
                        <span onClick={userDeletePost} className="icon">
                            <BiTrash size={20} color="#000"/>
                        </span>
                        {post?.title}
                    </span>
                    <Link to={replaceMultiParams(routes.post.path, [':id', ':postId'], [userId, post?.id])}
                        className="icon">
                        <BsArrowRightCircleFill size={20}/>
                    </Link>
                </CardBody>
            </Card>
        )
    )
}

export default PostCard
