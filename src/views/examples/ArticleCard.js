  import React from "react"; 
  import './Article.css';
  import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

  const ArticleCard = ({title, id, description}) => {
    return (
        <Link to={'/view-article/${id}'} style={{ textDecoration: 'none'}}>
            <div className="card">
                <img src="image" alt =""/>
                <h1>{title}</h1>
                <h2>{description}</h2>
            </div>
        </Link>
    )
  }
  export default ArticleCard