import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Leaderboard from "../components/leaderboard";

const LeaderboardPage = () => {
    return (
        <Container>
            <div id="leaderboard-title" style={{ textAlign: 'left' }}>
                <h2>Subject: Mathematics LeaderBoard</h2>
                <p>Level: Secondary 1</p>
            </div>
            <div className="container">
                <Leaderboard />
            </div>
        </Container>
    );
};

export default withRouter(LeaderboardPage);