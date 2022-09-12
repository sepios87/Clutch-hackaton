import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Notification } from '../assets/icons/notification.svg';
import { ReactComponent as Driving } from '../assets/icons/driving.svg';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Message } from '../assets/icons/message.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';

import './Navbar.scss';

const Navbar = ({role}) => {
    const [navArray, setNavArray] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Navbar personnalisé
        if (role === 'student') {
            setNavArray([
                { route: '/dashboard', icon: Home },
                { route: '/messages', icon: Message },
                { route: '/map', icon: Driving },
                { route: '/notifications', icon: Notification },
                { route: '/profil', icon: User },
            ]);
        } else {
            setNavArray([
                { route: '/dashboard', icon: Home },
                { route: '/messages', icon: Message },
                { route: '/cours', icon: Calendar },
                { route: '/notifications', icon: Notification },
                { route: '/profil', icon: User },
            ]);
        }
    }, []);

    return (
        <nav className="nav">
            <ul className="nav__list">
                {navArray.map((item, id) => (
                    <li key={id}>
                        <Link to={item.route}>
                            <div
                                className={`nav__item ${
                                    location.pathname === item.route &&
                                    'nav__item--selected'
                                } ${
                                    Math.floor(navArray.length / 2) === id &&
                                    'nav__item--center'
                                }`}
                            >
                                <item.icon/>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
