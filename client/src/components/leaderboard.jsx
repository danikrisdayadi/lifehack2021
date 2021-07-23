import React, { Component } from "react";
import { Card, Image, ProgressBar, Button} from 'react-bootstrap';


class LeaderBoard extends Component {

    constructor(props) {
        super(props);

        this.state = { //to do with the backend data
            students: [
                {
                    name: "Ayam 1", 
                    profile:"https://www.gravatar.com/avatar",
                }, 
                {
                    name: "Ayam 2", 
                    profile:"https://www.gravatar.com/avatar",
                },
                {
                    name: "Ayam 3", 
                    profile:"https://www.gravatar.com/avatar",
                }
            ]
        }
    }
    render() {
        var rank = 0
        const leaderboard = this.state.students.map((student) => {
            rank += 1
            return (
                <Card key= {student.name}>
                    <Card.Body>
                    <div id="profile" style={{width: '30%', display:"inline-block"}}>
                        <h1 style={{display:"inline-block", marginRight:"10%"}}>#{rank}</h1>
                        <Image src="https://www.gravatar.com/avatar" roundedCircle />
                    </div>
                      <div id="progressBar" style={{width: '40%', display:"inline-block"}}>
                        <Card.Title style={{textAlign:"left"}}> {student.name} </Card.Title>
                        <ProgressBar now="80" visuallyHidden variant="success" label="110/250"/>
                      </div>
                    <div id="profile" style={{width: '30%', display:"inline-block"}}>
                        <h3 style={{display:"inline-block", marginRight:"10%"}}>Lvl 18</h3>
                        <Button style={{display:"inline-block"}}>Give a coin</Button>
                    </div>
                      
                    </Card.Body>
                </Card>
            );
        });
        return (
            <React.Fragment>
                <div id="leaderboard-title" style={{textAlign:'left'}}>
                    <h2>Subject: Mathematics LeaderBoard</h2>
                    <p>Level: Secondary 1</p>
                </div>
                <div className="container">
                    <div>
                        {leaderboard}
                    </div>
                </div>
            </React.Fragment>
        )}
};

export default LeaderBoard;