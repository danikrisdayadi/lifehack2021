import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image, Button, Container, Col, Row } from 'react-bootstrap';
import Coin from '../assets/coin.svg';
import Blur from 'react-css-blur';
import { connect } from 'react-redux';
import axios from 'axios';
import { UserPlaceholder } from '../utils/placeholder';
import { CharactersPlaceholder } from '../utils/characters';

const ShopPage = ({ ...props }) => {
    const [shop, setShop] = useState(CharactersPlaceholder);
    const [profile, setProfile] = useState(UserPlaceholder);

    useEffect(() => {
        setProfile(profile);
    }, [props.userProfile]);

    const [usersCharacters, setCharactersOwned] = useState(
        profile.ownedAvatars
    );

    const checkIfOwned = (ownedCharacter) => {
        console.log('shop ', shop);
        if (
            usersCharacters.some(
                (character) => character.name === ownedCharacter.name
            )
        ) {
            return true;
        }
        return false;
    };

    const percentageOwned = (usersCharacters.length / shop.length) * 100;
    const handleBuy = (username, character) => {
        axios
            .put(
                `api/users/profiles/${username}/characters`,
                username,
                character
            )
            .then((response) => setCharactersOwned(response.data));
    };

    const button = (character) => {
        console.log('character ', character);
        console.log(checkIfOwned(character));
        console.log(profile);
        if (!checkIfOwned(character)) {
            // if character is not purchased
            // if (user.characters.indexOf(character) < 0) {
            return (
                <Button
                    variant="light"
                    style={{ marginTop: 20 }}
                    onClick={handleBuy(profile.username, character)}
                >
                    {' '}
                    {character.price} <img src={Coin} width="20px" alt="coin" />
                </Button>
            );
        } else if (
            checkIfOwned(character) &&
            profile.avatar.name == character.name
        ) {
            // if character is used as avatar
            // } else if (user.characters.indexOf(character) > -1) {
            return (
                <Button
                    style={{
                        marginTop: 20,
                        backgroundColor: '#17A2B8'
                    }}
                >
                    Selected
                </Button>
            );
        } else {
            // if character is purchased but not used as avatar
            return (
                <Button
                    variant="secondary"
                    style={{
                        marginTop: 20
                    }}
                >
                    Select
                </Button>
            );
        }
    };

    const characterPicture = (character) => {
        if (!checkIfOwned(character)) {
            // if character is not purchased
            // if (user.characters.indexOf(character) < 0) {
            return (
                <Blur radius="3px">
                    <Image src={character.picture} width="100px" />
                </Blur>
            );
        } else {
            // if character is purchased but not used as avatar
            return <Image src={character.picture} width="100px" />;
        }
    };

    console.log(shop);
    const charactersList = shop.map((character) => {
        return (
            <Col>
                <Card style={{ width: '18rem', border: '0px', flex: 1 }}>
                    <Card.Body>
                        <Col lg="auto">
                            <Row>{characterPicture(character)}</Row>
                            <Row>{button(character)}</Row>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        <Container>
            <div id="leaderboard-title" style={{ textAlign: 'left' }}>
                <h1>Shop</h1>
                <br></br>
                <h5>
                    {profile.coins} <img src={Coin} width="20px" alt="coin" />
                </h5>
                <br></br>
                <h4>Avatars ({percentageOwned}% complete)</h4>
            </div>
            <div className="container"></div>
            <Row lg={4}>{charactersList} </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    userProfile: state.userProfile
});

export default connect(mapStateToProps)(withRouter(ShopPage));
