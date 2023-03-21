import React from 'react';
import './Home.css';
import PlaceholderVideo from '../../assets/vid/bg.mp4';
import {
    Button,
    Card,
    CardBody,
    CardText,
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = () => {
    return (
        <div className='hero-container'>
            <div className='hero-btns'>
                <video src={PlaceholderVideo} autoPlay loop muted />
                <br/>
                <Card style={{ width: "36rem", backgroundColor: 'transparent', border: 'transparent' }}>
                  <CardBody>
                    <h1 style={{ fontSize: "4rem", color: "white" }}>It`s not too late.</h1>
                    <CardText style = {{ color: "white"}}>
                      As the threat of climate change looms before us, we must take action to avert the potential
                      environmental crisis.
                      <br/>
                      <br/>
                      Here, you can browse insightful articles, observe key global statistics,
                      and analyse your past and present resource-saving practices.
                    </CardText>
                    <Link to="/auth/register">
                        <Button>GET STARTED</Button>
                    </Link>
                  </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default Home