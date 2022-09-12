import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import './Waiting.scss';

const Waiting = () => {
    const [redirect, setRedirect] = useState(false)

    useEffect(()=> {
        const interval = setTimeout(() => {
            setRedirect(true)
        }, 3000);
        return () => clearInterval(interval);
    })
    return <main className="main">
        <div className="main__logo">
            <img className="main__img" src="img/waiting_car.png" alt=""/>
                <h1 className="main__nom">Clutch</h1>
        </div>
        {redirect && <Navigate to="/home" />}
    </main>

};

export default Waiting;
