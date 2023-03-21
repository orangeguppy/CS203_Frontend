
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
  Card,
  CardTitle,
  CardBody,
  CardImg,
  CardText,
  Container,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import React from "react"; 
import { useState, useEffect } from "react";
import ArticleHeader from "../../components/Headers/ArticleHeader.js";
// import ArticleHeader from "components/Headers/ArticleHeader.js";
import "./Article.css";

function Article () {
  const [articleList, updateArticleList] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');

  useEffect(() => {
      fetch(`http://localhost:8080/article/get-article-by-articleTitle/${query}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(query)
          updateArticleList(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [query]);

   const updateSearch = e => {
      setSearch(e.target.value);
      setQuery(e.target.value);
      console.log(search);
   }

   const getSearch = e => {
      e.preventDefault();
      setQuery(search);
   }

  return (
      <>
      <ArticleHeader />
      <Container className="mt--7" fluid>
        <div className="container">

          <Row>
              <Col>
                  <Form onSubmit={getSearch}>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={search} onChange={updateSearch}/>
                      </InputGroup>
                  </Form>
              </Col>
          </Row>


          <Row>
            <Col>
            &nbsp; 
            </Col>
          </Row>

          <Row>
            &nbsp; 
          </Row>

          <Row>
            &nbsp; 
          </Row>

          <Row>
            <Col lg="7" md="10">
              <h1 className="text-black mt-40 mb-50">
                Your daily scoop of the latest climate news.
              </h1>
            </Col>
          </Row>

          <Row>
              {articleList.map(data => (
                <a href={data.articleURL} target="_blank" rel="noreferrer">
                  <Card className = "Article" key={data.articleId} style={{ width: "18rem", marginTop: "2rem", "justifyContent": "center", "alignItems": "center" }}>
                    <CardImg 
                        alt="..."
                        src= {data.articleImgURL}
                        top
                    />
                    <CardBody>
                      <CardTitle>{data.articleTitle}</CardTitle>
                      <CardText>
                        {data.article_description}
                      </CardText>
                    </CardBody>
                  </Card>
                  </a>
              ))}
          </Row>
        </div>
      </Container>
      </>
  )
}
export default Article;