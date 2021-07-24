import React, { useEffect, useState } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfile from '../components/userprofile';
import styled from 'styled-components';
import { UserPlaceholder } from '../utils/placeholder';

// Interface for Redux types
import { setUserProfile } from '../redux/actions/UserProfileActions';
import { logoutUser } from '../redux/actions/AuthActions';

const Style = styled.div`
    text-align: left;
`;
const ProfilePage = ({ ...props }) => {
    const { queryId } = useParams();

    const [profile, setProfile] = useState(UserPlaceholder);

    useEffect(() => {
        console.log('inside', profile);
        if (!queryId) {
            props.history.push(`/profile/${props.auth.user.username}`);
        }

        axios.get(`/api/users/profiles/${queryId}`).then(({ data }) => {
            setProfile(data);
        });
    }, [profile]);

    const avatars = profile
        ? profile.ownedAvatars.map((avatar) => {
              return (
                  <Col>
                      <Row
                          className="justify-content-center"
                          style={{ height: 100 }}
                      >
                          <img
                              src={`${process.env.PUBLIC_URL}/avatars/${avatar}.png`}
                              alt="avatar"
                              width="150"
                          />
                      </Row>
                      <Row className="justify-content-center">
                          <Button style={{ marginTop: 20 }}>Select</Button>
                      </Row>
                  </Col>
              );
          })
        : null;

    return (
        <Style>
            <Container>
                <h1>{profile.firstName}</h1>
                <br></br>
                <h3>Profile Summary</h3>
                <UserProfile />
                <br />
                <br />
                <h3>Owned Avatars</h3>
                <Row lg={6}>{avatars}</Row>
            </Container>
        </Style>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    userProfile: state.userProfile
});

export default connect(mapStateToProps, {
    logoutUser,
    setProfile: setUserProfile
})(withRouter(ProfilePage));
