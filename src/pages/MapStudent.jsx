import React, { useState, useEffect } from 'react';
import { Map } from '../components/Map';

import './MapStudent.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Car from '../components/Car';

const MapStudent = () => {
    const [sessions, setSessions] = useState([]);

    const getDataSessions = () => {
        fetch('/api/sessions')
            .then((res) => res.json())
            .then((res) => {
                const resultat = res
                    .filter((e) => e.studentUserId == null)
                    .splice(0, 3);
                setSessions(resultat);
            });
    };

    useEffect(() => {
        return getDataSessions();
    }, []);

    return (
        <div className="student-map">
            <div className="cards-instit">
                {sessions.map(e => <Car session={e}/>)}
            </div>
            <Map className="map-back" />
        </div>
    );
};

export default MapStudent;
