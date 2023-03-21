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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import AuthService from "../../services/authService";
import axios from "axios";

const Header = () => {

    const currentUser = AuthService.getCurrentUser();
    const [val, setval] = useState(0);
    const [carbonVal, setCarbonVal] = useState(0);
    const [familyMembers, setFamilyMembers] = useState(0);
    const [familyScore, setFamilyScore] = useState(0);
    const [familyData, setFamilyData] = useState([]);
    const [email, setFamilyEmail] = useState("")
    const [dataReady, setDataReady] = useState(false);

    const [carbonArray, setCarbonArray] = useState([])
    const dates = [];
    const userId = currentUser.id;
    const [carbonUserPercent, setCarbonUserPercent] = useState(0);
    var moment = require('moment');

    const [userRank, setUserRank] = useState(0);

    axios.get(`http://localhost:8080/carbonEmissions/${userId}`)
        .then(response => {

            response.data.forEach(element => {

                let num = element.emission;
                //console.log(num);
                carbonArray.push(Math.round(num));
                var pdatetime = new Date(element.datetime)
                var result = moment(pdatetime).format("Do MMM")
                //console.log(result)
                dates.push(result);
            });

            // SetUp Percentage
            setCarbonUserPercent((carbonArray[carbonArray.length-1] -  carbonArray[carbonArray.length-2]) / carbonArray[carbonArray.length-1] * 100);
            //console.log("PRECENT" + carbonUserPercent);
            setDataReady(true)
        })
        .then(
            console.log(dataReady)
        )
        .catch(error => {
            console.log(error)
        })

        useEffect(() => {
        fetch(`http://localhost:8080/users/find-user-rank/7`)
        .then((response) => {
                    setUserRank(response.data);
                    console.log("UR" + userRank);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Latest Carbon Emission
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {carbonArray[carbonArray.length - 1]}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> {carbonUserPercent.toFixed(2)}%
                      </span>{" "}
                      <span className="text-nowrap">Since Last Carbon Emission</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          RANKING
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {parseInt(userRank) + 1} </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Sales
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;