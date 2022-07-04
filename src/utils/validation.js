import * as Yup from 'yup'
import text from './validationText'

const fields = {
    TITLE: 'Title',
    BODY: 'Body',
    NAME: 'Name',
    USERNAME: 'Username',
    EMAIL: 'Email',
    PHONE: 'Phone',
    WEBSITE: 'Website'
}

const MIN_LENGTH = 6
const MIN_NAME_LENGTH = 3

const addPostSchema = Yup.object().shape({
    title: Yup.string()
        .required(text.required(fields.TITLE))
        .min(MIN_LENGTH, text.length(fields.TITLE, MIN_LENGTH, 'minimum')),
    body: Yup.string()
        .required(text.required(fields.BODY))
        .min(MIN_LENGTH, text.length(fields.BODY, MIN_LENGTH, 'minimum'))
})

const editUserSchema = Yup.object().shape({
    name: Yup.string()
        .required(text.required(fields.NAME))
        .min(MIN_NAME_LENGTH, text.length(fields.NAME, MIN_NAME_LENGTH, 'minimum')),
    username: Yup.string()
        .required(text.required(fields.USERNAME))
        .min(MIN_NAME_LENGTH, text.length(fields.USERNAME, MIN_NAME_LENGTH, 'minimum')),
    email: Yup.string()
        .required(text.required(fields.EMAIL))
        .email(text.like_email(fields.EMAIL)),
    phone: Yup.string()
        .required(text.required(fields.PHONE))
        .min(MIN_LENGTH, text.length(fields.PHONE, MIN_LENGTH, 'minimum')),
    website: Yup.string().url(text.invalid_field(fields.WEBSITE))
        .required(text.required(fields.WEBSITE))
})

export {
    addPostSchema,
    editUserSchema
}
