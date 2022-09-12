import React, { useEffect, useState, useContext } from 'react';
import { LoginContexte } from '../App';
import Creneau from '../components/Creneau';
import { Header } from "../components/Header";
import { Link } from 'react-router-dom';
import MeetItem from '../components/MeetItem';

import './Cours.scss';

const Cours = props => {
    const { state, dispatch } = useContext(LoginContexte);
    const [meet, setMeet] = useState([]);
    const [user, setUser] = useState([]);

    const getData = () => {
        fetch(`/api/sessions?instructorUserId=${state.user.id}`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setMeet(
                    data.filter(
                        (e) =>
                            new Date(e.dateStart * 1000).getDate() <
                            new Date().getDate()
                    )
                );
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (<div className="page-cours">
        <Link to="/profil/modifier" className='connectHome__button'>Définir mes horaires</Link>
            <h2 className="page-cours__title">Mes prochains cours : </h2>
            <ul>
                {meet.map((sessions) => (
                    <li key={sessions.id}>
                        <MeetItem
                            key={sessions.id}
                            idOtherPeople={sessions.instructorUserId}
                            start={sessions.dateStart}
                            end={sessions.dateEnd}
                        />
                    </li>
                ))}
            </ul>

    </div>

    )
}


export default Cours
