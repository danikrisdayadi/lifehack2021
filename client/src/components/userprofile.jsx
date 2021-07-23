import React, { Component } from "react";
import {ProgressBar, Image, Card} from "react-bootstrap";


const UserProfile = () => {
    return (
        <Card >
            <div className="card-body">
            <div id="profile" style={{width: '30%', float:"left"}}>
                <Image src="https://www.gravatar.com/avatar" roundedCircle />
                <Card.Title>Melissa</Card.Title>
            </div>
              <div id="progressBar" style={{width: '70%', float:"right"}}>
                <p>Lvl {/*TODO*/}2 Mathematics
                <ProgressBar now="80" variant="success" /></p>
                <p>Lvl {/*TODO*/}1 Physics
                <ProgressBar now="60" variant="info" /></p>
                <p>Lvl {/*TODO*/}3 Chemistry
                <ProgressBar now="90" variant="warning"/></p>
              </div>
            </div>
        </Card>
    )
};


export default UserProfile;
