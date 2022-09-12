import React, {useEffect, useState} from 'react';
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg";

import './Discussion.scss';
import login from "./Login";
import {Link, useParams} from "react-router-dom";

export const Discussion = () => {
    const [sender, setSender] = useState();
    const params = useParams();

    const getUserInfos = () => {
        fetch(`/api/users?id=${params.id}`)
            .then((data) => data.json())
            .then((data) => setSender(data[0]));
    };

    useEffect(() => {
        getUserInfos();
    }, []);

    if (sender) {
        return <div className="page">
            <div className="card card-discussion">
                <Link to="/messages">
                    <Arrow className="purple" />
                </Link>
                <img className="card__img" src={`../${sender.image}`} alt="Man"/>
                <div className="card__infos">
                    <h3 className="card__title">{sender.firstName+' '+sender.lastName}</h3>
                </div>
            </div>
            <div className="messages">
                <article className="message message--other">
                    <p className="message__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi asperiores distinctio dolores eius, eligendi enim, facere fuga itaque magnam nam nobis odio omnis, quas quidem sunt suscipit unde velit.</p>
                    <p className="message__date">9h50</p>
                </article>
                <article className="message message--me">
                    <p className="message__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi asperiores distinctio dolores eius, eligendi enim, facere fuga itaque magnam nam nobis odio omnis, quas quidem sunt suscipit unde velit.</p>
                    <p className="message__date">9h50</p>
                </article>
            </div>
        </div>
    }else{
        return <></>;
    }

}
