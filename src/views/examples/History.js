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
    CardTitle,
    CardHeader,
    CardBody,
    CardImg,
    CardText,
    Container,
    FormGroup,
    Form,
    Input,
    NavItem,
    NavLink,
    Nav,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalBodyProps,
    ModalFooter,
    ModalFooterProps,
    ModalHeader,
    ModalHeaderProps,
} from "reactstrap";

import React from "react";
import { useState } from "react";
import axios from "axios";
import HistoryHeader from "components/Headers/HistoryHeader.js";
import { Alert } from "reactstrap";
import AuthService from "../../services/authService";
import { useEffect } from "react";
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";


const History = () => {
    const [activeNav, setActiveNav] = useState(1);
    let [chartExample1Data, setChartExample1Data] = useState("data1");
    const [dataReady, setDataReady] = useState(false);
    const carbonData = new Array();
    const dates = [];
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    var moment = require('moment')

    // async created () {

    // }
    axios.get(`http://localhost:8080/carbonEmissions/${userId}`)
        .then(response => {

            response.data.forEach(element => {

                let num = element.emission;
                console.log(num);
                carbonData.push(Math.round(num));
                var pdatetime = new Date(element.datetime)
                var result = moment(pdatetime).format("Do MMM")
                console.log(result)
                dates.push(result);
            });
            setDataReady(true)
        })
        .then(
            // setDataReady(true),
            // console.log('yaya'),
            // setDataReady(true),
            console.log(dataReady)
            
        )
        .catch(error => {
            console.log(error)
        })

    var myChart = new Chart("myChart", {
        type: "line",
        data: data,
        options: chartExample2.options
    });

    function isValidInput(str) {
        if (str.length === 1 && str.match(/[a-z]/i)) {
            console.log("The ValidInput function is working");
            return false;
        }
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    // const labels = Utils.months({count: 7});
    const data = {
        labels: dates,
        datasets: [{
            label: 'Emissions',
            data: carbonData,
            fill: true,
            borderColor: 'rgb(178,34,34,0.6)',
            cubicInterpolationMode: 'default',
            backgroundColor: 'rgb(178,34,34,0.1)'
        }]
    };
    // setTimeout(function() {chartExample1.update();}, 1000)

    return (
        <>
            <HistoryHeader />
            <Container className="mt--7" fluid>

                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <span>

                                <Row>
                                    <Col> <Card>
                                        <CardHeader>
                                            <Row className="align-items-center">
                                                <div className="col">
                                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                                        Overview
                                                    </h6>
                                                    <h2 className="mb-0">Carbon History</h2>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            
                                            <div>
                                            {dataReady ? 
                                                <Line 
                                                data={data}
                                                options= {chartExample2.options}
                                                /> : "loading"}
                                            </div>
                                            

                                        </CardBody>
                                    </Card>
                                    </Col>
                                </Row>
                            </span>
                        </div>
                    </div>
                </div >
            </Container >
        </>

    );

};
export default History;
