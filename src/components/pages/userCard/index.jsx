import {Button, Card, CardBody, CardHeader, CardText, Form, FormGroup, FormText, Input, Label} from 'reactstrap'
import {CardTitle} from '../../core/Title'
import {Link} from 'react-router-dom'
import {replaceParams} from '../../../utils/navigation'
import {routes} from '../../../routes'
import {useState} from 'react'
import {Formik} from 'formik'
import {editUserSchema} from '../../../utils/validation'
import text from './text.json'
import {useDispatch} from 'react-redux'
import {updateUser} from '../../../stores/users'

const UserCard = ({user}) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const fieldItem = (name, type, placeholder = '') => {
        return {
            name,
            type,
            placeholder
        }
    }

    const fields = [
        fieldItem('name', 'text'),
        fieldItem('username', 'text'),
        fieldItem('email', 'email'),
        fieldItem('phone', 'text'),
        fieldItem('website', 'url', 'https://fermanallahverdiev.com')
    ]

    const generateFields = (values, handleChange, errors) => {
        return fields.map(field => (
            <FormGroup key={field.name}>
                <Label for={`${field.name}-${user?.id}`}>{text[field.name]}</Label>
                <Input invalid={errors[field.name]} type={field.type} name={field.name} id={`${field.name}-${user?.id}`}
                    value={values[field.name]}
                    onChange={handleChange} placeholder={field.placeholder}/>
                <FormText color="danger">{errors[field.name]}</FormText>
            </FormGroup>
        ))
    }
    const userEdit = async(values, {resetForm}) => {
        await dispatch(updateUser(user?.id, values, resetForm))
        toggleEditMode()
    }
    return (
        editMode ? (
            <Card>
                <CardHeader>
                    <CardTitle>{text.edit_user}</CardTitle>
                </CardHeader>
                <CardBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={user}
                        onSubmit={userEdit}
                        validationSchema={editUserSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {({values, handleChange, handleSubmit, errors}) => (
                            <Form onSubmit={e => e.preventDefault()}>
                                {generateFields(values, handleChange, errors)}
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
                <CardHeader>
                    <CardTitle>{user?.name}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        {user?.username}
                    </CardText>
                    <CardText>
                        <a href={`mailto:${user?.email}`}>{user?.email}</a>
                    </CardText>
                    <CardText>
                        <a href={`tel:${user?.phone}`}>{user?.phone}</a>
                    </CardText>
                    <CardText>
                        <a href={user?.website} target="_blank">{user?.website}</a>
                    </CardText>
                    <CardText>{user?.company?.name}</CardText>
                    <CardText>{user?.company?.catchPhrase}</CardText>
                    <CardText>{user?.company?.bs}</CardText>
                    <div className="d-flex justify-content-center mt-4">
                        <Link className="text-white text-decoration-none btn btn-primary"
                            to={replaceParams(routes.user.path, ':id', user?.id)}>{text.detail}</Link>
                    </div>
                </CardBody>
            </Card>
        )
    )
}

export default UserCard
