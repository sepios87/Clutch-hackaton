import React, { useEffect, useContext, useState } from 'react';
import { LoginContexte } from '../App';
import CardNotificationMoniteur from './CardNotificationMoniteur';

import './NotificationStudent.scss';
const NotificationInstructor = () => {
    const { state, dispatch } = useContext(LoginContexte);
    const [sessions, setSessions] = useState([]);

    const getData = () => {
        fetch(`/api/sessions?instructorUserId=${state.user.id}&&status=0`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setSessions(data.filter((e) => e.studentUserId !== null));
            });
    };

    const checkNotif = (id, newSession) => {
        const newArray = [...sessions];
        newArray.splice(id, 1);
        setSessions(newArray);
        fetch(`/api/sessions/${newSession.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSession),
        })
            .then((res) => res.json())
            .then((e) => {
                console.log(e);
            });
    }

    // todo: remettre
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="notifications">
                <h2 className="title__notifications">
                    Mes demandes d'élèves :{' '}
                </h2>
                <ul>
                    {sessions && (
                        <>
                            {sessions.map((session, id) => (
                                <li key={sessions.id}>
                                    <CardNotificationMoniteur
                                        session={session}
                                        checkNotif={(newSession) => checkNotif(id, newSession)}
                                    />
                                </li>
                            ))}
                        </>
                    )}
                </ul>
                {sessions.length === 0 && <p>(Plus aucune demande)</p>}
            </div>
        </div>
    );
};

export default NotificationInstructor;
