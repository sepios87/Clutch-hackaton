import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './Messages.scss';
import { LoginContexte } from '../App';
import { Link } from 'react-router-dom';

const Message = ({ id, message }) => {
    const [user, setUser] = useState();

    const getUserInfos = () => {
        fetch(`/api/users?id=${id}`)
            .then((data) => data.json())
            .then((data) => setUser(data[0]));
    };

    useEffect(() => {
        getUserInfos();
    }, []);

    const date = new Date(message.sendDate);
    const hours = date.getHours() + 'h' + date.getMinutes();
    const day = date.getDate() + '/' + date.getMonth();
    if (user) {
        return (
                <Link to={`/discussion/${user.id}`} className="cardMessage">
                    <>
                        <img src={'../'+user.image} alt="Man" className="cardMessage__img" />
                        <div className="cardMessage__infos">
                            <h3 className="cardMessage__title">
                                {user.firstName + ' ' + user.lastName}
                            </h3>
                            <p className="cardMessage__body">{message.content}</p>
                            <p className="cardMessage__date">
                                Envoyé à {hours} le {day}
                            </p>
                        </div>
                    </>
                </Link>
    );
    }else{
        return <></>;
    }

};

export const Messages = () => {
    const [messages, setMessages] = useState([]);

    const { state, dispatch } = useContext(LoginContexte);
    const currentUser = state.user.id;

    // Retrieve markers
    const getData = () => {
        fetch(
            `/api/messages?recipient=${currentUser}&_sort=sendDate&_order=desc`
        )
            .then((res) => res.json())
            .then((res) => setMessages([...new Set(res)]));
    };

    // Send datas after page initialization
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="page">
            <Header title="Mes messages" path={'/dashboard'} />
            <div className="cardsMessage">
                {messages.map((message) => (
                    <Message
                        key={message.sender}
                        id={message.sender}
                        message={message}
                    />
                ))}
            </div>
        </div>
    );
};
