import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from '../assets/icons/arrow.svg';

import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = ({ title, path, withBack = true }) => {
    return (
        <header className="header">
            {withBack && (
                <Link className="back" to={path}>
                    <Arrow />
                </Link>
            )}

            <h2 className={`header__title ${!withBack && "header__title--center"}`}>{title}</h2>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};
