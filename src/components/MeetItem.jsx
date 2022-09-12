import React, { useEffect, useState} from 'react'

import {ReactComponent as Timer} from "../assets/icons/timer-2.svg";
import {ReactComponent as Arrow} from "../assets/icons/arrow-right.svg";
import {ReactComponent as Message} from "../assets/icons/message.svg";

import './DashboardStudent.scss';

const MeetItem = props => {

    const {
        idOtherPeople,
        start,
        end
    } = props

    const [otherPeople, setOtherPeople] = useState([]);

    const getOtherPeople = () => {
        fetch(`/api/users?id=${idOtherPeople}`, {
            methode: 'GET',
            credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            setOtherPeople(data[0])
          })
    }

    useEffect(() => {
        getOtherPeople( );
    }, []);

    const getFormatDate = () =>{
        const day = new Date(start* 1000).getDay();
        const month = new Date(start* 1000).getMonth()
        return `${('0' + day).slice(-2)} /${('0' + month).slice(-2)}`;
    }

    const getFormatHeureStart = () => {
        const hoursStartDate = new Date(start* 1000).getHours();
        const minutesStartDate = new Date(start* 1000).getMinutes();
        return `${hoursStartDate}h${minutesStartDate}`;
    };
    const getFormatHeureEnd = () => {
        const hoursEndDate = new Date(end* 1000).getHours();
        const minutesEndDate = new Date(end* 1000).getMinutes();
        return `${hoursEndDate}h${minutesEndDate} `;
    };


    return <div className="cards-student">
            <div className="card-course-student">
                <img src="man.jpg" alt="Man" className="card-course-student__img"/>
                <div className="card-course-student-infos">
                    <p className="card-course-student-date">{getFormatDate()}</p>
                    <div className="card-course-student-hour">
                        <Timer />
                        <p className="card-course-student-hour-course">{getFormatHeureStart()} <Arrow/> {getFormatHeureEnd()}</p>
                    </div>
                    <p className="card-course-student-name">{otherPeople.firstName} {otherPeople.lastName}</p>
                    <Message className="card-course-student-msg" />
                </div>
            </div>
        </div>
}


export default MeetItem
