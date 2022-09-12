import React, { useEffect, useState, useContext } from 'react';
import { LoginContexte } from '../App';
import { ReactComponent as Clutch } from '../assets/icons/clutch.svg';
import { ReactComponent as Driving } from '../assets/icons/driving.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import MeetItem from './MeetItem';

import './DashboardStudent.scss';

const DashboardStudent = (props) => {
    const { state, dispatch } = useContext(LoginContexte);
    const [meet, setMeet] = useState([]);
    const [user, setUser] = useState([]);

    const getData = () => {
        fetch(`/api/sessions?studentUserId=${state.user.id}`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMeet(
                    data.filter(
                        (e) =>
                            new Date(e.dateStart * 1000).getDate() <
                            new Date().getDate()
                    )
                );
            });
    };

    const getUser = () => {
        fetch(`/api/users?id=${state.user.id}`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data[0]);
            });
    };

    useEffect(() => {
        getData();
        getUser();
    }, []);

    return (
        <div>
            <header className="header-dashboard">
                <Clutch className="header-clutch" />
                <h2 className="title-underline--white">Hello</h2>
                {user && (
                    <h3 className="title-underline--white">
                        {user.firstName} {user.lastName}
                    </h3>
                )}
            </header>
            <div className="buttons-dashboard">
                <Link className="buttons-dashboard__button" to="/">
                    <Driving className='buttons-dashboard__icon'/>
                    <p className='buttons-dashboard__link' >Prendre un cours</p>
                </Link>
                <Link className="buttons-dashboard__button buttons-dashboard__button--blue" to="/">
                    <User className='buttons-dashboard__icon buttons-dashboard__icon--blue'/>
                    <p className='buttons-dashboard__link' >Modifier vos informations</p>
                </Link>
            </div>
            <div className="dashboard-next">
                <h2 className="title__dashboard">Vos prochaines heures : </h2>
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
        </div>
    );
};

export default DashboardStudent;
