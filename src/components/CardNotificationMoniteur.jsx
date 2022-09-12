import React, { useEffect, useState } from 'react';

import { ReactComponent as Timer } from '../assets/icons/timer-2.svg';
import { ReactComponent as Arrow } from '../assets/icons/arrow-right.svg';
import { ReactComponent as Check } from '../assets/icons/check.svg';
import { ReactComponent as Cross } from '../assets/icons/cross.svg';

import './CardNotificationMoniteur.scss';

const CardNotificationMoniteur = ({ session, checkNotif }) => {
    const [otherPeople, setOtherPeople] = useState([]);

    const getOtherPeople = () => {
        fetch(`/api/users?id=${session.studentUserId}`, {
            methode: 'GET',
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setOtherPeople(data[0]);
            });
    };

    useEffect(() => {
        getOtherPeople();
    }, []);

    const getFormatDate = () => {
        const day = new Date(session.dateStart * 1000).getDay();
        const month = new Date(session.dateEnd * 1000).toLocaleDateString(
            'fr-FR',
            {
                month: 'short',
            }
        );
        return `${('0' + day).slice(-2)} ${month}`;
    };

    const getFormatHeureStart = () => {
        const hoursStartDate = new Date(session.dateStart * 1000).getHours();
        const minutesStartDate = new Date(
            session.dateStart * 1000
        ).getMinutes();
        return `${hoursStartDate} h ${minutesStartDate}`;
    };
    const getFormatHeureEnd = () => {
        const hoursEndDate = new Date(session.dateEnd * 1000).getHours();
        const minutesEndDate = new Date(session.dateEnd * 1000).getMinutes();
        return `${hoursEndDate} h ${minutesEndDate} `;
    };

    const check = () => {
        const newSession = { ...session };
        newSession.status = 1;
        checkNotif(newSession);
    };

    const unCheck = () => {
        const newSession = { ...session };
        newSession.studentUserId = null;
        checkNotif(newSession);
    }

    return (
        <div className="cards-notification-moniteur">
            <div className="card-notification-moniteur">
                <img
                    src="man.jpg"
                    alt="Man"
                    className="card-notification-moniteur__img"
                />
                <div className="card-notification-moniteur-infos">
                    <p className="card-notification-moniteur-date">
                        {getFormatDate()}
                    </p>
                    <div className="card-notification-moniteur-hour">
                        <Timer />
                        <p className="card-notification-moniteur-hour-course">
                            {getFormatHeureStart()} <Arrow />{' '}
                            {getFormatHeureEnd()}
                        </p>
                    </div>
                    <p className="card-notification-moniteur-name">
                        {otherPeople.firstName} {otherPeople.lastName}
                    </p>
                    <div className="card-notification-moniteur-containerItem">
                        <Check
                            onClick={check}
                            className="card-notification-moniteur-item"
                        />
                        <Cross onClick={unCheck} className="card-notification-moniteur-item card-notification-moniteur-item--blue" />
                    </div>
                    </div>
            </div>
        </div>
    );
};
export default CardNotificationMoniteur
