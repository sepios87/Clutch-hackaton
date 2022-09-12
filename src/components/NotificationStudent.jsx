import React, {useEffect, useContext, useState} from 'react';
import { LoginContexte } from '../App';
import MeetItem from './MeetItem';

import './NotificationStudent.scss';
const NotificationStudent = () => {


    const { state, dispatch } = useContext(LoginContexte);
    const [sessions, setSessions] = useState([]);
    const [leconPasse, setLeconPasse] = useState([]);

    const getData = () => {
        fetch(`/api/sessions?studentUserId=${state.user.id}&&status=0`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setSessions( data );
            });
    };


    const getLeconPasse = () => {
        fetch(`/api/sessions?studentUserId=${state.user.id}&&status=1`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setSessions( data.filter(
                    (e) =>
                        new Date(e.dateStart * 1000).getDate() >
                        new Date().getDate()
                ) );
            });
    };

    
    // todo: remettre
    useEffect(() => {
        getData();
        getLeconPasse();

    }, []);

    return <div>
        <div className="notifications">
                <h2 className="title__notifications">Mes dernières demandes : </h2>
                <ul>
                    {sessions && <>
                        {sessions.map(sessions =>
                            <li key={sessions.id}>
                                <MeetItem
                                    key={sessions.id}
                                    idOtherPeople={sessions.instructorUserId}
                                    start = {sessions.dateStart}
                                    end = {sessions.dateEnd}
                                />
                            </li>
                        )}</> 
                    }
                </ul>
            </div>

            <div className="notifications">
                <h2 className="title__notifications">Mes dernières leçons : </h2>
                <ul>
                {leconPasse && <>
                    {leconPasse.map(lecon =>
                        <li key={lecon.id}>
                            <MeetItem
                                key={lecon.id}
                                idOtherPeople={lecon.instructorUserId}
                                start = {lecon.dateStart}
                                end = {lecon.dateEnd}
                            />
                        </li>
                    )}</> 
                }
                </ul>
            </div>
    </div>
}


export default NotificationStudent