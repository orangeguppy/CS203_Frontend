import React from 'react';
import {
    Row,
    Col,
    Card,
    Modal
} from 'reactstrap'
import img1 from '../assets/img/success/img-3.png'

const RegistrationSuccessful = () => {

    return (
        <div className="form-content-right" style={ { maxWidth: '30rem' }}>
            <Card style={{backgroundColor: '#414a4c', textAlign: 'center', paddingTop:'50px'}}>
                <h1 style={{ color: 'white' }}>Account created!</h1>
                <img src={img1} alt="success-image"
                className="form-img-2"
                style={{padding: 50}}
                />
            </Card>
        </div>
    )
}
export default RegistrationSuccessful