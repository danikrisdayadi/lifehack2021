import React from 'react';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Button, Image } from 'react-bootstrap';
import GoogleLogo from '../../assets/google.svg';

const Google = (props) => {
    const responseGoogle = (res) => {
        const userData = {
            network: 'google',
            token: res.tokenObj.id_token
        };

        if (!props.auth.isAuthenticated) {
            props.loginUser(userData, props.history, true);
            props.setDisableSubmit(true);
        }
    };

    const errorGoogle = () => {
        props.history.push('./error500');
    };

    const googleContent = (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? 'errorId'}
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
                <Button
                    variant="dark"
                    onClick={() => {
                        renderProps.onClick();
                    }}
                >
                    <Image
                        src={GoogleLogo}
                        alt="google-login"
                        height={25}
                        width={20}
                    />{' '}
                    Sign in with Google
                </Button>
            )}
        />
    );

    return <div>{googleContent}</div>;
};

export default withRouter(Google);
