import React, { useEffect, useState, useContext } from 'react'
import { LoginContexte } from '../App';
import {Link, Redirect} from 'react-router-dom';
import {ReactComponent as Card} from '../assets/icons/card.svg';
import PaymentCard from "../components/PaymentCard";

import './Profil.scss';

const Profil = () => {
    const { state, dispatch } = useContext(LoginContexte);
    const [user, setUser] = useState();

    const getData = () => {
        fetch(`/api/users?id=${state.user.id}`, {
            methode: 'GET',
            credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            setUser(data[0]);
          })
    }

    useEffect(() => {
        getData();
    }, []);

    const logout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((e) => e.msg === "success" && dispatch({type: 'logout'}));
    };

    return <section className="profil-main">
        <p className='profil-main__logout' onClick={logout}>Se déconnecter</p>
        {user && <>
            <header className="profil-header">
                <img className="profil-header__image" src={`/${user.image}`} alt=""/>
                <h2 className="profil-header__titre">{user.firstName + ' ' + user.lastName}</h2>
                {state.user.role === 'instructor' && <p className="profil-header__type">Moniteur depuis {user.since}</p>}
            </header>
            {state.user.role === 'instructor' &&
                <section className="profil-section">
                    <h3 className="profil-section__titre">Horaires</h3>
                    <section className="profil-section__jours">
                        <div className="profil-section__div">
                            <p>Lu.</p>
                            {user.openHours[0] !== 'Fermé' && <p>{user.openHours[0]}</p>}
                            {user.closeHours[0] !== 'Fermé' && <p>{user.closeHours[0]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Ma.</p>
                            {user.openHours[1] !== 'Fermé' && <p>{user.openHours[1]}</p>}
                            {user.closeHours[1] !== 'Fermé' && <p>{user.closeHours[1]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Me.</p>
                            {user.openHours[2] !== 'Fermé' && <p>{user.openHours[2]}</p>}
                            {user.closeHours[2] !== 'Fermé' && <p>{user.closeHours[2]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Je.</p>
                            {user.openHours[3] !== 'Fermé' && <p>{user.openHours[3]}</p>}
                            {user.closeHours[3] !== 'Fermé' && <p>{user.closeHours[3]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Ve.</p>
                            {user.openHours[4] !== 'Fermé' && <p>{user.openHours[4]}</p>}
                            {user.closeHours[4] !== 'Fermé' && <p>{user.closeHours[4]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Sa.</p>
                            {user.openHours[5] !== 'Fermé' && <p>{user.openHours[5]}</p>}
                            {user.closeHours[5] !== 'Fermé' && <p>{user.closeHours[5]}</p>}
                        </div>
                        <div className="profil-section__div">
                            <p>Di.</p>
                            {user.openHours[6] !== 'Fermé' && <p>{user.openHours[6]}</p>}
                            {user.closeHours[6] !== 'Fermé' && <p>{user.closeHours[6]}</p>}
                        </div>
                    </section>
                    <Link className="profil-section__bouton" to="/profil/modifier">Modifier mes horaires</Link>
                </section>
             }
            <section className="profil-section profil-section__information">
                <h3 className="profil-section__titre profil-section__titre--information">Paramètre général</h3>
                <div className="profil-section__informations">
                    <p className="profil-section__texte"><strong className="profil-section__texte-strong">Nom :</strong> {user.lastName}</p>
                    <p className="profil-section__texte"><strong className="profil-section__texte-strong">Prénom :</strong> {user.firstName}</p>
                    <p className="profil-section__texte"><strong className="profil-section__texte-strong">Email :</strong> {user.email}</p>
                </div>
                {
                    user && user.role === 'instructor' && <Link to="/profil/modifier" className="profil-section__bouton--sauv">Modifier</Link>
                }
            </section>

            <Link to="/" className="profil-section__bouton--update-password">Changer mon mot de passe</Link>

            <section className="profil-section profil-section__information  ">
                <h3 className="profil-section__titre profil-section__titre--information">Mode de paiement </h3>
                <PaymentCard carte={user.payment}/>
                <div className="profil-section__informations">
                    <p className="profil-section__texte-carte"><Card className="profil-section__icon"/>  Modifier votre mode de paiement</p>
                    <p className="profil-section__texte-carte"><Card className="profil-section__icon"/>  Supprimer votre mode de paiement</p>
                </div>
            </section>

            <section className="profil-section profil-section__information  ">
                <h3 className="profil-section__titre profil-section__titre--information">Mise à jour</h3>
                <div className="profil-section__informations">
                    <p className="profil-section__texte"><strong className="profil-section__texte-strong">Dernière mise à jour : </strong> 09/02/2022 </p>
                    <p className="profil-section__texte"><strong className="profil-section__texte-strong">Recherche de mise à jour  </strong>  </p>
                </div>
            </section>

            <section className="profil-section__center ">
                <p className="profil-section__texte-footer">Dernière mise à jour</p>
                <p className="profil-section__texte-footer">09/02/2022</p>
                <p className="profil-section__texte-footer">1.8</p>
            </section></>}
        </section>
}

export default Profil
