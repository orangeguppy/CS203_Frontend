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
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Col,
    Label,
    Modal
} from "reactstrap";

import React, { useState, useRef } from 'react';
import axios from "axios";
import AuthService from "../../services/authService";
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

const UserHeader = () => {
  const currentUser = AuthService.getCurrentUser();
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [city, setCity] = useState(currentUser.city)
  const [country, setCountry] = useState(currentUser.country)
  const [aboutMe, setAboutMe] = useState(currentUser.aboutMe)

  const history = useHistory();

  const editProfileToggle = (e) => {
    e.preventDefault()
    setProfileModalOpen(!profileModalOpen)
  }

  const logoutPanelToggle = (e) => {
      e.preventDefault()
      setLogoutModalOpen(!logoutModalOpen)
  }

  const logout = (e) => {
    e.preventDefault()
    AuthService.logout()
    history.push("/auth/index")
  }

  const onChangeFirstName = (e) => {
    console.log(e.target.value)
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
      console.log(e.target.value)
      setLastName(e.target.value);
  };

  const onChangeCity = (e) => {
      console.log(e.target.value)
      setCity(e.target.value);
  };

  const onChangeCountry = (e) => {
      console.log(e.target.value)
      setCountry(e.target.value);
    };

  const onChangeAboutMe = (e) => {
      console.log(e.target.value)
      setAboutMe(e.target.value);
  };

  const editAccountDetails = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/users/update', {
          id: currentUser.id,
          firstName: firstName,
          lastName: lastName,
          username: currentUser.username,
          email: currentUser.email,
          country: country,
          city: city,
          aboutMe: aboutMe
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

    axios.get(`http://localhost:8080/users/get-user/${currentUser.id}`)
      .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(error => {
          console.log(error)
      })
    editProfileToggle(e);
    history.push("/admin/user-profile");
  }

  return (
    <>
        <Modal
            isOpen={profileModalOpen}
            className="edit-profile"
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Profile
                </h5>
                <Button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setProfileModalOpen(!profileModalOpen)}
                >
                  <span aria-hidden={true}>×</span>
                </Button>
            </div>

            <div className="modal-body">
             <Container>
                <Form>
                 <div>
                 <h6 className="heading-small text-muted mb-4">User Information</h6>
                 <Row>
                   <Col>
                    <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                         >Username
                        </label>

                        <Input
                        className="form-control-alternative"
                        id="input-username"
                        type="text"
                        defaultValue={currentUser.username}
                        disabled={true}
                        />
                     </FormGroup>
                    </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    type="email"
                    defaultValue={currentUser.email}
                    disabled={true}
                  />
                </FormGroup>
              </Col>
             </Row>

             <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    First name
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="-"
                    id="input-first-name"
                    type="text"
                    defaultValue={currentUser.firstName}
                    onChange={(e) => onChangeFirstName(e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    Last name
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-last-name"
                    placeholder="-"
                    defaultValue={currentUser.lastName}
                    type="text"
                    onChange={(e) => onChangeLastName(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
        </div>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Contact information
          </h6>
          <div>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-city"
                  >
                    City
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="City"
                    type="text"
                    defaultValue={currentUser.city}
                    onChange={(e) => onChangeCity(e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Country
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-country"
                    placeholder="Country"
                    type="text"
                    defaultValue={currentUser.country}
                    onChange={(e) => onChangeCountry(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            About Me
          </h6>
          <Row>
            <Col>
                <FormGroup>
                   <span>
                    <Input
                      className="form-control-alternative"
                      defaultValue={currentUser.aboutMe}
                      id="input-about-me"
                      type="textarea"
                      onChange={(e) => onChangeAboutMe(e)}
                    />
                   </span>
                </FormGroup>
            </Col>
         </Row>
         <p>Refresh the Profile page afterwards to view your changes!</p>
        </Form>
          </Container>
            </div>
              <div className="modal-footer">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={(e) => editProfileToggle(e)}
                >
                  Close
                </Button>

                <Button color="primary" type="button" onClick={(e) => editAccountDetails(e)}>
                  Save changes
                </Button>
            </div>
        </Modal>

        <Modal
            isOpen={logoutModalOpen}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Logout
                </h5>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setProfileModalOpen(!profileModalOpen)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
            </div>

            <div className="modal-body"><h1>Are you sure? You will be redirected to the front page.</h1></div>
              <div className="modal-footer">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={(e) => logoutPanelToggle(e)}
                >
                  Close
                </Button>

                <Button color="danger" type="button" onClick={(e) => logout(e)}>
                  Logout
                </Button>
            </div>
        </Modal>

      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello, {currentUser.username}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can view and edit your account details here.
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => editProfileToggle(e)}
              >
                Edit profile
              </Button>
              <Button
                  color="danger"
                  href="#pablo"
                  onClick={(e) => logoutPanelToggle(e)}
              >
                Log out
              </Button>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default UserHeader;