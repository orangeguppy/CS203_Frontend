import React, { useState } from 'react';
import Register from './Register.js';
import RegistrationSuccessful from '../../components/RegistrationSuccessful.jsx'

const RegisterPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true)
    }

    return (
    <>
            {!isSubmitted ? (
                  <Register submitForm={submitForm} />
            ) : (
                  <RegistrationSuccessful />
            )}
    </>
    )
}
export default RegisterPage