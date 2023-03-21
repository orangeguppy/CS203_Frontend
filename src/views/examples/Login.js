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

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import AuthService from "../../services/authService.js";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Login = () => {
    const history = useHistory();
    const API_URL = "http://localhost:8080/api/auth/";

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };

    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const onSuccess = (res) => {
      console.log(res.profileObj)
      setMessage("");
      setLoading(true);
      AuthService.login(res.profileObj.name, res.profileObj.googleId).then(
          () => {
            console.log("logged in")
            history.push("/admin/article");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
      );
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      console.log("clicked")
      setMessage("");
      setLoading(true);
      AuthService.login(username, password).then(
          () => {
            console.log("logged in")
            history.push("/admin/article");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
      );
    };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
                  />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleLogin} data-testid="inapp-form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    id="username"
                    name="username"
                    data-testid="username"
                    onChange={onChangeUsername}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                    name="password"
                    data-testid="password"
                    onChange={onChangePassword}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;