
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
import { Container, Row, Col } from "reactstrap";
import Iframe from 'react-iframe';

const ArticleHeader = () => {
  return (
    <>
      <div
        className="header pb-80 pt-5 pt-lg-80 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
            "url(" + require("../../assets/img/header/ArticleHeader.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      > 

            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>
            <Col>
            &nbsp; 
            </Col>

          <Col>
            <Iframe
              url='https://www.theworldcounts.com/embeds/counters/23?background_color=transparent&color=white&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=30' 
              width="600px"
              height="240px"
              display="block"
              position="center"/>
          </Col>


        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
        </Container>
      </div>
    </>
  );
};
export default ArticleHeader;