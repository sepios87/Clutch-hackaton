import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Header} from "./Header";
import {Input} from "./Input";

import './SignUpForm.scss';
import {Separator} from "./Separator";
import { Link } from 'react-router-dom';

const SignUpForm = props => {

    const {
        disabled,
        onSubmit
    } = props

    const [formState, setFormState] = useState({
        username: '',
        password: '',
        role: '',
        lastName: '',
        firstName: ''
    })

    const handleFormChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        return onSubmit(formState)
    }

    const RadioChange = event => {
        setFormState({
            role: event.target.value
        });
    }

    return <div className="page">
        <Header title="Créer un compte" path="/home" />
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__check">
                    <label className="form__label" htmlFor="role">
                        Vous êtes :
                    </label>

                    <div className="form__check-choices" onChange={RadioChange}>

                        <label for="instructor"><input className="form__radio" type="radio" id="role" name="role" value="instructor" defaultChecked={true} /> Moniteur</label>
                        <label for="student"><input className="form__radio" type="radio"  id="role" name="role" value="student" /> Étudiant</label>

                    </div>
                </div>
                    <Input
                        type="Nom"
                        id="lastName"
                        placeholder="Nom"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleFormChange}
                        disabled={disabled}
                        secondary={true}
                    />
                    <Input
                        type="Nom"
                        id="firstName"
                        placeholder="Prénom"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleFormChange}
                        disabled={disabled}
                        secondary={true}
                    />
                    <Input
                        type="email"
                        id="username"
                        placeholder="Email"
                        name="username"
                        value={formState.username}
                        onChange={handleFormChange}
                        disabled={disabled}
                        secondary={true}
                    />
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        value={formState.password}
                        onChange={handleFormChange}
                        disabled={disabled}
                        secondary={true}
                    />
                    <input className='signup__button--blue' type="submit" value="Créer un compte"/>
                    <Separator />
                    <Link className='signup__button' to='/login'>Se connecter</Link>
            </form>
        </div>
    </div>
}

SignUpForm.propTypes = {
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default SignUpForm
