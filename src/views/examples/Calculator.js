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
  CardBody,
  Container,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CalculatorHeader from "components/Headers/CalculatorHeader.js";
import { Alert } from "reactstrap";
import AuthService from "../../services/authService";
import { timers } from "jquery";


const Calculator = () => {

  const userId = AuthService.getCurrentUser().id;
  const [water, setWaterCarbon] = useState('');
  const [electric, setElectricCarbon] = useState('');
  const [food, setFoodCarbon] = useState('');
  const [flight, setFlightCarbon] = useState('');
  const [drive, setDriveCarbon] = useState('');

  function sendData(e) {
    const sendValue = totalCarbonFootprint(food, water, electric, flight, drive).toFixed(2)
    
    e.preventDefault()
    axios.post('http://localhost:8080/carbonEmissions', {
        datetime: Date.now(),
        emission: sendValue,
        user: userId
      },{
      headers:{
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



  // Water value enter by user in form
  const handleWaterChange = (e) => {
    setWaterCarbon(e.target.value);
  }

  // Electric enter by user in form
  const handleElectricChange = (e) => {
    setElectricCarbon(e.target.value);
  }

  // Food enter by user in form
  const handleFoodChange = (e) => {
    setFoodCarbon(e.target.value);
  }

  //Flight Times by user in form
  const handleFlightChange = (e) => {
    setFlightCarbon(e.target.value);
  }

  //Enter distance driven by user in form
  const handleDriveChange = (e) => {
    setDriveCarbon(e.target.value);
  }

  const [finalValue, setFinalValue] = useState(0.00)

  /*The general idea is that the user enters in their respective value. 
    Utilise this value to divide by the month/week
    Then multiply by the Emission Factor of that respective product
     to get a yearly value if applicable
    return this final yearly carbon Value  
    We obtained the emission factor by doing online research; specifically climate papers
    in the SMU library */

  function flightCarbonCalculator(flight) {
    const flightEmissionFactor = 90;
    const carbPerFlight = flight * flightEmissionFactor;

    return carbPerFlight;
  }

  //This function calculates the Carbon generated  for Drives
  function driveCarbonCalculator(drive) {
    const carbonGeneratedPerKM = 120.1;
    const avgDistPerDrive = 10;
    const distanceForAllDrives = drive * avgDistPerDrive;

    const carbonGeneratedofAllDrives = distanceForAllDrives * carbonGeneratedPerKM;

    return carbonGeneratedofAllDrives;
  }

  //Function to calculate electricityFootprint using electric monthly bill as a parameter
  function electricityFootprintCalculation(electric) {
    const electricityTariff = 32.28;
    const numMonthsInAYear = 12;
    const electricityEmissionFactor = 0.37;

    const totalElectricityUsedMonthly = electric / electricityTariff;

    const electricityFootprint = totalElectricityUsedMonthly * numMonthsInAYear * electricityEmissionFactor;
    return electricityFootprint;
  }

  //Function to calculate water carbon footprint using water bill as a parameter
  function waterFootprintCalculation(water) {
    const fortyLitres = 40;
    const priceOffirst40Litres = 2.74;
    const priceOfFirst40LitersOfWaterUsed = fortyLitres * priceOffirst40Litres;

    const totalTarrifsAfter40Liters = 1.52 + 0.99 + 1.18;
    const waterEmissionFactor = 0.376;
    const daysAMonth = 30;
    const daysAYear = 364;

    const remainingwaterBill = water - priceOfFirst40LitersOfWaterUsed;

    const waterUsedForRemainder = remainingwaterBill / totalTarrifsAfter40Liters;

    const totalWaterUsed = waterUsedForRemainder + fortyLitres;
    const waterFootprint = totalWaterUsed / daysAMonth * daysAYear * waterEmissionFactor;
    return waterFootprint;
  }

  //Function to calculate yearly food carbon footprint using food wasted as a parameter
  function foodFootprintCalculation(food) {
    const daysAWeek = 7;
    const daysAYear = 364;
    const foodEmissionFactor = 0.095;
    const foodFootprint = (food / daysAWeek * foodEmissionFactor) * daysAYear;
    return foodFootprint;
  }

  //using user inputs, passing them into the footprint calculation functions, and then generate total
  //carbon footprint
  function totalCarbonFootprint(food, water, electric, flight, drive) {

    //Yearly ElectricityFootprint 
    var electricityFootprint = electricityFootprintCalculation(electric);
    //Yearly waterFootprint
    var waterFootprint = waterFootprintCalculation(water);

    //yearly foodFootprint
    var foodFootprint = foodFootprintCalculation(food);

    //yearly carbongeneratedPerFlight
    var carbPerFlight = flightCarbonCalculator(flight);

    //yearly carbonGeneratedPerDrive
    var carbonGeneratedPerDrive = driveCarbonCalculator(drive);

    //summation of totalCarbon footprint pared on a year basis
    var totalCarbon = electricityFootprint + waterFootprint + foodFootprint + carbPerFlight + carbonGeneratedPerDrive;

    return totalCarbon;
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => console.log(finalValue), [finalValue]);


  //event which occurs when user presses the submit button on calculator frontend
  const handleSubmit = (event) => {
    //prevent null values from being entered by user (User does not enter anything)
    event.preventDefault();

    //send all values to the totalCarbonFootprint functon
    setFinalValue(totalCarbonFootprint(food, water, electric, flight, drive).toFixed(2));
      setModalOpen(!modalOpen)
      sendData(event)
  }

  //We used whitelisting to prevent erronous input by users
  //Users are forced to enter real numbers only. This includes doubles though if they have any reason to do so
  //However, they are unable to enter letter concated numbers: a2b for example is not a valid input
  //The form cannot be submitted if a2b is used as an input
  //Negative numbers also cannot be submitted, with the likewise error above
  //An error message will be shown if an invalid input is attempted to be submitted
  

  const selectRecyclingOption = (event, value) => {
    if (event.target.checked) {
      // here the radio is checked and value contains the option's value
      if (value === 1) {
        return 41;
      }
      else if (value === 2) {
        return 125;
      }
      else if (value === 3) {
        return 208;
      }
      else if (value === 4) {
        return 791;
      }
    }
  }

  return (
    <>
      <CalculatorHeader />
      <Container className="mt--7" fluid>

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <span>
                <Card style={{ width: "50rem", "justifyContent": "center", "alignItems": "center" }}>

                  <CardBody style={{ "justifyContent": "center", "alignItems": "center" }}>
                    <CardTitle>Please Enter Your Number Of Flights, Monthly Water Bill, Monthly Electric Bill, Amount of Food Wasted, and Number of Times you drove your car today!
                    </CardTitle>

                    <Col xs="8">
                      <Form style={{ "justifyContent": "center", "alignItems": "center" }} onSubmit={(e) => { handleSubmit(e) }}>

                        <container>
                          <Row>
                            <Col>
                              <span>
                                <label>Number of Short-Haul Flights </label>
                              </span>
                            </Col>

                          </Row>
                        </container>

                        <Input
                          type="number"
                          onKeyPress="return event.charCode >= 48"
                          min="0"
                          className="form-control-alternative"
                          required
                          value={flight}
                          onChange={(e) => { handleFlightChange(e) }}
                          data-testid="MonthlyFlight" 
                          placeholder="A short haul flight is one which is lesser than 3 hours" />
                        <br />

                        <container>
                          <Row>
                            <Col>
                              <label>Monthly Water Bill</label>
                              <Input
                                type="number"
                                onKeyPress="return event.charCode >= 48"
                                min="0"
                                className="form-control-alternative"
                                required
                                value={water}
                                onChange={(e) => { handleWaterChange(e) }}
                                data-testid="MonthlyWaterBill" 
                                placeholder="$1000" />
                              <br />
                            </Col>

                          </Row>
                        </container>

                        <container>
                          <Row>
                            <Col>
                              <label>Monthly Electric Bill</label>
                              <Input
                                type="number"
                                onKeyPress="return event.charCode >= 48"
                                min="0"
                                className="form-control-alternative"
                                required
                                value={electric}
                                onChange={(e) => { handleElectricChange(e) }}
                                data-testid="MonthlyElectricBill" 
                                placeholder="$1000" />
                              <br />
                            </Col>
                          </Row>
                        </container>


                        <label>Food wasted</label>
                        <Input
                          type="number"
                          onKeyPress="return event.charCode >= 48"
                          min="0"
                          className="form-control-alternative"
                          value={food} required onChange={(e) => { handleFoodChange(e) }}
                          data-testid="WeeklyFoodBill" 
                          placeholder="100kg" />
                        <br></br>
                        <label> Number Of Times Driven Today </label>
                        <Input
                          type="number"
                          onKeyPress="return event.charCode >= 48"
                          min="0"
                          className="form-control-alternative"
                          value={drive} required onChange={(e) => { handleDriveChange(e) }}
                          data-testid="WeeklyFoodBill" 
                          placeholder="100km" />

                        <div className="d-flex justify-content-center mb-3">
                          <div className="p-2">
                            <br />

                            <Button
                              color="info"
                              type="submit"
                            >
                              Calculate My Carbon Footprint!
                            </Button>

                            <Modal toggle={() => setModalOpen(!modalOpen)
                            } isOpen={modalOpen}>
                              <div className=" modal-header">


                                <h5 className=" modal-title" id="exampleModalLabel">

                                  Carbon Score
                                </h5>
                                <Button
                                  aria-label="Close"
                                  className=" close"
                                  type="button"
                                //   onClick={() => setModalOpen(!modalOpen)}
                                >
                                  <span aria-hidden={true}>×</span>
                                </Button>
                              </div>
                              <ModalBody>Your Carbon Score Is:

                                <h1>

                                  {finalValue}
                                </h1>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="secondary"
                                  type="button"
                                  onClick={() => setModalOpen(!modalOpen)}
                                >
                                  Close
                                </Button>
                                <Button color="primary" type="button">
                                  Compare With My Past Scores!
                                </Button>
                              </ModalFooter>
                             </Modal>
                          </div>
                        </div>
                      </Form>
                    </Col>
                  </CardBody>
                </Card>
              </span>
            </div>
          </div>
        </div >
      </Container>
    </>

  );
};
export default Calculator;
