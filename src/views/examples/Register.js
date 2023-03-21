/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import useForm from '../../components/useForm.js'
import validate from '../../components/validateInfo'
import ReCAPTCHA from "react-google-recaptcha"
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Register = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(submitForm, validate);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const [captchaNotDoneMsg, setCaptchaNotDoneMsg] = useState('')
  const [captchaNotSet, setCaptchaNotSet] = useState('true')

  const [ profile, setProfile ] = useState([]);
  const clientId = '344597679392-asqno5b3vcapdgt1du5kvf2mnccidbsm.apps.googleusercontent.com';

  useEffect(() => {
     const initClient = () => {
           gapi.auth2.init({
           clientId: clientId,
           scope: ''
           });
     };
     gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
      axios.post('http://localhost:8080/users/register', {
        username: res.profileObj.name,
        email: res.profileObj.email,
        password: res.profileObj.googleId
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .catch(function (error) {
          console.log(error);
        });
  };

  const onFailure = (err) => {
      console.log('failed:', err);
  };

  function sendData(e) {
    e.preventDefault()
    axios.post('http://localhost:8080/users/register', {
      username: values.username,
      email: values.email,
      password: values.password
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function allSubmitFunctions(e) {
    console.log('start')
    console.log(captchaToken)
    console.log('end')
    if (captchaNotSet) {
        setCaptchaNotDoneMsg('Prove you`re human first!')
        console.log('Not set!')
    }
    if (!captchaNotSet) {
        console.log('Set')
        setCaptchaNotDoneMsg('')
    }
    handleSubmit(e)
    sendData(e)
  }

  const verify = () => {
    console.log('verifying')
    setCaptchaNotSet(false)
    setCaptchaNotDoneMsg('')
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Get started with</small>
            </div>
            <div className="text-center">
              <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                     <Button
                         className="btn-neutral btn-icon"
                         color="default"
                         href="#pablo"
                         onClick={renderProps.onClick}
                     >
                         <span className="btn-inner--icon">
                           <img alt="..." src={require("../../assets/img/icons/common/google.svg").default}
                           />
                           </span>
                         <span className="btn-inner--text">Google</span>
                     </Button>
                  )}
                  isSignedIn={true}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={allSubmitFunctions}>
              <FormGroup>
                {errors.username &&
                  <h5
                    style={{ color: '#f5365c' }}>
                    {errors.username}
                  </h5>
                }
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    value={values.username}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                {errors.email &&
                  <h5
                    style={{ color: '#f5365c' }}>
                    {errors.email}
                  </h5>
                }
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                {errors.password &&
                  <h5
                    style={{ color: '#f5365c' }}>
                    {errors.password}
                  </h5>
                }
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                {errors.password2 &&
                  <h5
                    style={{ color: '#f5365c' }}>
                    {errors.password2}
                  </h5>
                }
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="password2"
                    autoComplete="new-password"
                    value={values.password2}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
              {captchaNotSet &&
                <h5
                  style={{ color: '#f5365c' }}>
                  {captchaNotDoneMsg}
                </h5>
              }
                  <ReCAPTCHA
                    sitekey="6LdAxugiAAAAAGArrEePUg5t1yI-CfwbnZWq6EQZ"
                    ref={captchaRef}
                    theme="light"
                    onClick={verify}
                  />
              </FormGroup>
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
