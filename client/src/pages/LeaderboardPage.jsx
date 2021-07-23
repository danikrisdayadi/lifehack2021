import React from "react";
import { withRouter } from "react-router-dom";
import LeaderBoard from '../components/leaderboard'

const LeaderboardPage = () => {
    return (
        <LeaderBoard />
    );
};

export default withRouter(LeaderboardPage);