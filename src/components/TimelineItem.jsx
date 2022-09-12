import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import {ReactComponent as Clock} from "../assets/icons/timer-2.svg";
import {ReactComponent as Payment} from "../assets/icons/card.svg";
import {ReactComponent as Position} from "../assets/icons/location.svg";
import {ReactComponent as User} from "../assets/icons/user.svg";
import {ReactComponent as Star} from "../assets/icons/award.svg";

import './TimelineItem.scss';

const TimelineItem = ({ type, title, isFirst, current }) => {
    const [courses, setCourses] = useState()
    const get3Courses = () => {
        fetch(`/api/sessions?instructorUserId=${current}&studentUserId_ne=null&dateStart%3E${Date.now()}&_sort=dateStart&_order=asc&_limit=3`)
            .then((data) => data.json())
            .then((data) => setCourses(data));
    };

    useEffect(() => {
        get3Courses()
    }, []);

    return <div className="timeline-item">
        {type === 'course' ? <Clock className="timeline-item__icon" /> : <Payment className="timeline-item__icon" />}
        <h2 className="timeline-item__title">{ title }</h2>
        {type === 'course'
            ? <div className="timeline-item__infos">
                {
                    isFirst ?
                        <>
                            <div className="timeline-item__info">
                                <User />
                                <p>Jean Lassalle</p>
                            </div>
                            <div className="timeline-item__info">
                                <Star />
                                <p>12h de conduite</p>
                            </div>
                        </>
                        : <></>
                }
                <div className="timeline-item__info">
                    <Position />
                    <p>Église de Tasdon</p>
                </div>
            </div>
            : <>
                <div className="timeline-item__infos timeline-item__infos--flex">
                    <div className="timeline-item__info">
                        <p>Julien Testeur</p>
                    </div>
                    <div className="timeline-item__info">
                        <p>15.00 €</p>
                    </div>
                </div>
            </>
        }
    </div>

}

TimelineItem.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string
}

export default TimelineItem;
