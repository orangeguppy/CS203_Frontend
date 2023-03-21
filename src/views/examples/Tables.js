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
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect } from "react";
  import AuthService from "../../services/authService";
  import axios from "axios";
  
  
  const Tables = () => {
  
    const currentUser = AuthService.getCurrentUser();
    const [carbonRanking, setCarbonRanking] = useState([])
    const dates = [];
    const userId = currentUser.id;
    const [carbonUserPercent, setCarbonUserPercent] = useState(0);
    var moment = require('moment');
  
    const [pageNum, setPageNum] = useState(0) // set the page number


    const prePage = e => {
        if (pageNum != 0) {
            setPageNum(pageNum - 1);
        }
    }

    const nextPage = e => {
        setPageNum(pageNum + 1);
    }

      useEffect(() => {
          fetch(`http://localhost:8080/users/find-all-by-asc-score/page/${pageNum}`)
          .then((response) => response.json())
                    .then((data) => {
                      setCarbonRanking(data);
                      console.log(carbonRanking);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }, [pageNum]);
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Leaderboard</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">RANKING</th>
                      <th scope="col">Latest Carbon Emission Score</th>
                      <th scope="col">UserName</th>
                      <th scope="col">-</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
  
                  {carbonRanking.map(data => (
                    <tr key={data.id}>
                      <th scope="row">
                      {carbonRanking.indexOf(data)+1}
                      </th>
                      <td>{data.latestCarbonScore}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {data.username}
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
  
  
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => prePage(e)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      
                      
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => nextPage(e)}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
       </Container>
     </>
    )
  };
  
  export default Tables;
  