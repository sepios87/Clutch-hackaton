import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';
import { ReactComponent as Chrono } from '../assets/icons/chrono.svg';
import { ReactComponent as Map } from '../assets/icons/map.svg';
import { ReactComponent as Arrow } from '../assets/icons/arrow.svg';
import { ReactComponent as Start } from '../assets/icons/star.svg';

import './Moniteur.scss';

const Moniteur = () => {
    const params = useParams();

    const [user, setUser] = useState([]);

    const getData = () => {
        fetch(`/api/users?id=${params.id}`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data[0]);
                console.log(data);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="moniteur">
            <Link to="/home" className="moniteur__croix">
                <i className="fa-solid fa-times"></i>
            </Link>
            <header className="header">
                <section className="header__information">
                    <img
                        className="header__img"
                        src="/img/photoProfil.jpg"
                        alt="photoprofil"
                    />
                    <div className="header__description">
                        <h2 className="description__titre">{user.firstName + ' ' + user.lastName}</h2>
                        <p className="description__text">
                            Moniteur depuis {user.since}
                        </p>
                    </div>
                    <div className="header__note">
                        <Start className="star star--fill" />
                        <p>5</p>
                    </div>
                </section>
                <section className="header__notation">
                    {[...Array(5)].map(() => (
                        <Start className="star"/>
                    ))}
                </section>
                <section className="header__infos">
                    <div className="header__info">
                        <Chrono />
                        <p>1h30</p>
                    </div>
                    <div className="header__info">
                        <Map />
                        <p>150km</p>
                    </div>
                </section>
            </header>
            <section className="sectionMoniteur__informations">
                <img
                    className="sectionMoniteur__voiture"
                    src="/img/voiture.png"
                    alt="voiture"
                />
                <div className="sectionMoniteur__parcours">
                    <p>
                        <strong className="sectionMoniteur__strong">
                            Parcours
                        </strong>
                        Standard
                    </p>
                    <div className="sectionMoniteur__contenu">
                        <p>1h30</p>
                        <p>Clio 4</p>
                    </div>
                </div>
            </section>
            <aside className="sectionMoniteur sectionMoniteur--reservation">
                <Link to="/creneaux" className="sectionMoniteur__reserver">
                    <h3 className="sectionMoniteur__titre">
                        Découvrir les dates de disponibilité
                    </h3>
                    <Calendar className="sectionMoniteur__calendrier" />
                </Link>
            </aside>
            <section>
                <Link className="reservation" to="/home">
                    <p>Détail de la réservation</p>
                    <Arrow className="reservation__arrow" />
                </Link>
            </section>
            <div className="buttonMoniteur">
                <Link className="buttonMoniteur__button" to="/home">Valider</Link>
            </div>
        </div>
    );
};

export default Moniteur;
