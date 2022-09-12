import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from "react-google-login";

import './LoginForm.scss';
import {Header} from "./Header";
import {Input} from "./Input";
import {Separator} from "./Separator";
import { Link } from 'react-router-dom';
import {LoginContexte} from "../App";

const LoginForm = props => {

    const {
        state,
        dispatch
    } = useContext(LoginContexte);

    const {
        disabled,
        onSubmit
    } = props


    const [formState, setFormState] = useState({
        username: '',
        password: ''
    })

    const handleFormChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        return onSubmit(formState)
    }

    const facebookLogin = (res) => {
        dispatch({
            type: 'login_success',
            payload: {
                user: res.email,
                role: 'instructor',
                id: 5,
            },
        });
    }

    const googleLogin = (res) => {
        dispatch({
            type: 'login_success',
            payload: {
                user: res.Iu.yv,
                role: 'instructor',
                id: 5,
            },
        });
    }

    return <div className="page">
        <Header title="Se connecter" path="/home" />
        <div className="login">

            <form onSubmit={handleSubmit} className="form">
                <Input
                    type="email"
                    id="username"
                    placeholder="Email"
                    name="username"
                    value={formState.username}
                    onChange={handleFormChange}
                    disabled={disabled}
                    secondary={false}
                />
                <Input
                    type="password"
                    id="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formState.password}
                    onChange={handleFormChange}
                    disabled={disabled}
                    secondary={false}
                />
                <input className='login__button' type="submit" value="Se connecter"/>
            </form>
            <div className="messagesLogin">
                <p className="messageLogin">Mot de passe oublié ? <Link to="/" className="link link--strong">Cliquez ici</Link></p>
                <p className="messageLogin">Vous n'avez pas de compte ? <br/> <Link to="/signup" className="link">S'inscrire</Link></p>
            </div>
            <Separator />
            <div className="social-login">
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_ID}
                fields="name, email, picture"
                callback={facebookLogin}
                cssClass="oauth-btn"
                icon="fa-facebook"
                textButton=""
            />

            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                onSuccess={googleLogin}
                onFailure={googleLogin}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="oauth-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="icon">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                    </button>
                )}
            />
        </div>
        </div>
    </div>
}

LoginForm.propTypes = {
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default LoginForm
