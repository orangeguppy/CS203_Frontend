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
    Modal,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import AuthService from "../../services/authService";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [val, setval] = useState(0);
    let userId = 0;
    const [carbonVal, setCarbonVal] = useState(0);
    const [familyMembers, setFamilyMembers] = useState(0);
    const [familyScore, setFamilyScore] = useState(0);
    const [familyData, setFamilyData] = useState([]);
    const [email, setFamilyEmail] = useState("")

    let familyNames = []
    let familyScores = []

    const handleEmailChange = (e) => {
        setFamilyEmail(e.target.value)
        e.preventDefault()
    }



    const updateUser = (e) => {
        e.preventDefault();
        AuthService.updateUserDetails(currentUser.username, currentUser.password).then(
        );
    }

    if (currentUser === null) {
        return <Redirect to='/auth/register' />
     } else {
        userId = currentUser.id;
        axios.get(`http://localhost:8080/users/get-user/${currentUser.id}`)
           .then(response => {
               localStorage.setItem("user", JSON.stringify(response.data));
           })
           .catch(error => {
               console.log(error)
          })
   
          axios.get(`http://localhost:8080/carbonEmissions/latest/${currentUser.id}`)
            .then(response => {
                if (response.data.emission === undefined) {
                   setCarbonVal(0)
                } else {
                   setCarbonVal(response.data.emission);
                }
            })
            .catch(error => {
                console.log(error)
          })
     }

    axios.get(`http://localhost:8080/${userId}/familySize`)
        .then(response => {
            setFamilyMembers(response.data)
        })
        .then(wait => {
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(`http://localhost:8080/carbonEmissions/family/${userId}`)
        .then(response => {
            setFamilyScore(response.data)
            console.log(familyScore)
        })
        .then(wait => {
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(`http://localhost:8080/familyNames/${userId}`)
        .then(response => {
            response.data.forEach(element => {
                familyNames.push(element)
            });
        })
        .then(wait => {
            setTimeout(50000);
        })
        .catch(error => {
            console.log(error)
        })

    axios.get(`http://localhost:8080/familyScores/${userId}`)
        .then(response => {
            response.data.forEach(element => {
                familyScores.push(element)
            });
        })
        .then(wait => {
            if (familyData.length < familyMembers) {
                familyScores.forEach(function (score, index) {
                    familyData.push({ name: familyNames[index], carbon: familyScores[index] })
                });
            }
        })
        .catch(error => {
            console.log(error)
        })

    console.log(familyData)


    function submitForm() {
        console.log(email)
    }

    function addFamily() {
        console.log("request")
        console.log(email)
        axios.post('http://localhost:8080/users/family3', {
            user: userId,
            user2: email
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




    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={require("../../assets/img/theme/ProfilePic.jpg")}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading"> {carbonVal.toFixed(2)}</span>
                                                <span className="description">Latest Carbon Score</span>
                                            </div>
                                            <div>
                                                <span className="heading">{familyMembers}</span>
                                                <span className="description">Family Members</span>
                                            </div>
                                            <div>
                                                <span className="heading"> {familyScore.toFixed(2)}</span>
                                                <span className="description">Family Carbon Score</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <div>
                                        <h6 className="heading-small text-muted mb-4">
                                            About me
                                        </h6>
                                    </div>
                                    <p>
                                        {currentUser.aboutMe}
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Username
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
                                                        value={currentUser.username}
                                                        style={{ "caret-color": "transparent" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
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
                                                        value={currentUser.email}
                                                        type="email"
                                                        style={{ "caret-color": "transparent" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="-"
                                                        id="input-first-name"
                                                        type="text"
                                                        placeholder="-"
                                                        value={currentUser.firstName}
                                                        style={{ "caret-color": "transparent" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
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
                                                        type="text"
                                                        value={currentUser.lastName}
                                                        style={{ "caret-color": "transparent" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        City
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={currentUser.city}
                                                        id="input-city"
                                                        placeholder="-"
                                                        type="text"
                                                        value={currentUser.city}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Country
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={currentUser.country}
                                                        id="input-country"
                                                        placeholder="-"
                                                        type="text"
                                                        value={currentUser.country}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        Family Members
                                    </h6>
                                    <div className="pl-lg-4">
                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Emission</th>
                                            </tr>
                                            {familyData.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.name}</td>
                                                        <td>{val.carbon.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                        <FormGroup>
                                            <label
                                                style={{ marginTop: "30px" }}
                                                className="form-control-label"
                                                htmlFor="input-country"
                                                defaultValue="Email of Family Member"
                                            >
                                                Add Family Member
                                            </label>
                                            <Input
                                                style={{ marginTop: "10px" }}
                                                className="form-control-alternative"
                                                defaultValue="Email of Family Member"
                                                id="input-country"
                                                placeholder="Email of Family Member"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => { handleEmailChange(e) }}

                                            />
                                            <Button
                                                style={{ marginTop: "20px", padding: "10px" }}
                                                color="info"
                                                href="#pablo"
                                                // form="input-country"
                                                type="submit"
                                                onClick={() => addFamily()}
                                            // onChange={(e) => {e.preventDefault()}}
                                            >
                                                Add to Family
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Profile;
