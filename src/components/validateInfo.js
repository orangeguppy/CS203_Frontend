export default function validateInfo(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username= 'Username required'
    } else if (values.username.length < 4) {
        errors.username = 'Username needs to be 4 characters or longer'
    } else if (values.username.length > 20) {
        errors.username = 'Username cannot be longer than 20 characters'
    }

    if (!values.email) {
        errors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid'
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or longer'
    } else if (values.password.length > 127) {
        errors.password = 'Password cannot be longer than 127 characters'
    }

    if (!values.password2) {
        errors.password2 = 'Password is required'
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match'
    }
    return errors;
}