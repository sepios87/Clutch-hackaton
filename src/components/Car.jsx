import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';

import './Car.scss';

const Car = ({ session }) => {
    const [user, setUser] = useState();

    const getDataUser = (session) => {
        fetch('/api/users?id=' + session.instructorUserId)
            .then((res) => res.json())
            .then((res) => {
                setUser(res[0]);
            });
    };

    // Send datas after page initialization
    useEffect(() => {
        return getDataUser(session);
    }, []);

    return (
        user ? <Link to={`/moniteur/${user.id}`} className="card-car">
            <CarIcon className="card-car-icon" />
            <h2 className="card-car-title">{user.car.brand} {user.car.model}</h2>
            <p className="card-car-name">
                {user.firstName} {user.lastName}
            </p>
            <p className="card-car-hour">1h30</p>
        </Link> : <></>
    )
};

export default Car;
