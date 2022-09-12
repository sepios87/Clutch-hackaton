import React, { useEffect, useState }  from 'react';
import { ReactComponent as Location } from '../assets/icons/location.svg';
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';

import './Creneau.scss';
/**
 * Exemple utilisation
 */
{/* <Creneau dateEnd={1650290703767} dateStart={1649179373504} place="cocuou" /> */}

const Creneau = ({ dateStart, dateEnd, idplace }) => {
    const [place, setPlace] = useState([]);

    const getData = () => {
        fetch(`/api/places?id=${idplace}`, {
            methode: 'GET', 
            credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            setPlace(data[0].name)
          })
    }

    useEffect(() => {
        getData();
    }, []);

    const getFormatDate = () => {
        const day = new Date(dateStart* 1000).getDay();
        const month = new Date(dateStart* 1000).toLocaleDateString('fr-FR', {
            month: 'short',
        })
        const hoursStartDate = new Date(dateStart* 1000).getHours();
        const hoursEndDate = new Date(dateEnd* 1000).getHours();
        return `${hoursStartDate} h - ${hoursEndDate} h, ${day} ${month}`;
    };

    return (
        <div className="card-creneau">
            <Calendar className="card-creneau__icon" />
            <div className="card-creneau__content">
                <p className="card-creneau__date">{getFormatDate()}</p>
                <div className="card-creneau__location">
                    <Location />
                    <p>{place}</p>
                </div>
            </div>
        </div>
    );
};

export default Creneau;
