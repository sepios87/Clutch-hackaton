import React, { useContext } from 'react';
import { LoginContexte } from '../App';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
    const { state } = useContext(LoginContexte);

    return (
        <>
            <header className="headerHome">
                <section className="leading">
                    <img
                        className="leading__image "
                        src="img/logo.png"
                        alt="logo"
                    />
                    <h1 className="leading__title">clutch</h1>
                    <div className="leading__content">
                        <div>
                            <p>Choisis ton</p>
                            <p className="title-underline">Moniteur</p>
                            <p>et lance toi à</p>
                            <p className="title-underline">La Rochelle</p>
                        </div>
                    </div>
                </section>
                <div className="circlePrice">
                    <p className="circlePrice__price">20€</p>
                    <p className="circlePrice__text">par heure de conduite</p>
                </div>
                <section className="connectHome">
                    <p>
                        Connectez-vous pour acceder aux différentes
                        fonctionalités.
                    </p>
                    <div className="connectHome__buttons">
                        <Link className="connectHome__button" to="/login">
                            Se connecter
                        </Link>
                        <Link
                            className="connectHome__button--blue"
                            to="/signUp"
                        >
                            Créer un compte
                        </Link>
                    </div>
                </section>
            </header>
            <main className="contentHome">
                <h2 className="contentHome__title">clutch</h2>
                <div className="contentHome__container">
                    <h3 className="contentHome__subtitle">C'est quoi ?</h3>
                    <p className="contentHome__text">
                        Clutch accompagne tes progrès jour après jour et te
                        propose un calendrier d’apprentissage individualisé.
                        Notre plateforme d’e-learning est conçue pour des
                        moniteurs individuels et des étudiants à la recherche
                        d'heure de conduite moins chère.
                    </p>
                </div>
                <div className="contentHome__container">
                    <h3 className="contentHome__subtitle">
                        Nous sommes la ou vous etes
                    </h3>
                    <p className="contentHome__text">
                        Tu peux apprendre à conduire depuis n’importe lequel de
                        nos points de rendez-vous et en changer quand bon te
                        semble. Si tu dois faire une heure de cours après le
                        lycée : aucun souci, ton moniteur pourra te récupérer
                        directement. Clutch est fait pour faciliter ta vie et
                        celle de ton moniteur.
                    </p>
                </div>
            </main>
            <section className="numbersHome">
                <div className="numbersHome__item">
                    <p className="numbersHome__number">594</p>
                    <p>points de rendez-vous</p>
                </div>
                <div className="numbersHome__item">
                    <p className="numbersHome__number">594</p>
                    <p>enseignants</p>
                </div>
                <div className="numbersHome__item">
                    <p className="numbersHome__number">594</p>
                    <p>élèves</p>
                </div>
            </section>

            <p>{state.role}</p>
        </>
    );
};

export default Home;
