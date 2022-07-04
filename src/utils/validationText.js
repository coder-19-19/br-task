const text = {
    required: field => `${field} is required`,
    length: (field, length, type) => `${field} must be ${length} char ${type}`,
    invalid_field: field => `Invalid ${field}`,
    like_email: field => `${field} must match to email format`
}

export default text
