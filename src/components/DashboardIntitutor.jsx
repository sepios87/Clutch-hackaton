import React, {useContext, useEffect, useState} from 'react'
import {Map} from "./Map";

import {ReactComponent as Message} from "../assets/icons/message.svg";
import {ReactComponent as Award} from "../assets/icons/award.svg";
import {ReactComponent as Location} from "../assets/icons/location.svg";

import './DashboardIntitutor.scss';
import TimelineItem from "./TimelineItem";
import PaymentCard from "./PaymentCard";
import {LoginContexte} from "../App";

const CoursePlace = ({next}) => {
    const [place, setPlace] = useState()

    const getPlace = () => {
        fetch(`/api/places?id=${next.placeId}`)
            .then((data) => data.json())
            .then((data) => setPlace(data[0]));
    };

    useEffect(() => {
        getPlace();
    }, []);

    return  <div className="item-student__infos">
        {place && <p className="item-student__hour">{place.name}</p>}
    </div>;
}

const NextCourse = ({next}) => {
    const [userData, setUserData] = useState();

    const getUserInfos = () => {
        fetch(`/api/users?id=${next.studentUserId}`)
            .then((data) => data.json())
            .then((data) => setUserData(data[0]));
    };

    useEffect(() => {
        getUserInfos();
    }, []);

    const startDate = () => {
        var minutes = new Date(next.dateStart).getMinutes();
        if (minutes < 10) {
            minutes = '0'+ minutes;
        }
        return new Date(next.dateStart).getHours()+'h'+minutes;
    }

    const endDate = () => {
        var minutes = new Date(next.dateStart).getMinutes();
        if (minutes < 10) {
            minutes = '0'+ minutes;
        }
        return  new Date(next.dateEnd).getHours()+'h'+minutes;
    }

    if (userData) {
        return  <div className="card-next__item item-student">
            <img src="man.jpg" alt="Man" className="item-student__img"/>
            <div className="item-student__infos">
                <h3 className="item-student__name">{userData.firstName+' '+userData.lastName}</h3>
                <p className="item-student__hour">{startDate()} - {endDate()}</p>
            </div>
            <Message className="item-student__msg" />
        </div>
    }

    return <></>

};

const DashboardIntitutor = () => {
    let isFetch = false;
    const [hour, setHour] = useState(new Date());
    const {state, displatch} = useContext(LoginContexte)
    const currentUser = state.user.id;
    const [nextCourseData, setNextCourseData] = useState()
    const [pourcentCourses, setPourcentCourses] = useState()
    const [nbCourses, setNbCourses] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!isFetch) {
            getNextCourse();
            getDataUser();
            getNbSessions();
            isFetch = true;
        }
        const interval = setInterval(() => {
            setHour(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const getNextCourse = () => {
        fetch(`/api/sessions?instructorUserId=${currentUser}&studentUserId_ne=null&dateStart%3E${Date.now()}&_sort=dateStart&_order=asc&_limit=1`)
            .then(data => data.json())
            .then(data => setNextCourseData(data[0]))
    }

    const getDataUser = () => {
        fetch(`/api/users?id=${state.user.id}`, {
            methode: 'GET',
            credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            setUser(data[0]);
          })
    }

    const getNbSessions = () => {
        fetch(`/api/sessions?instructorUserId=${currentUser}`)
            .then(data => data.json())
            .then(data => {
                setNbCourses(data.length)
                var nbSessions = (data.length/20)*100;
                setPourcentCourses(parseInt(nbSessions));
            })
    }

    const getCourseData = () => {
        if(nextCourseData) {
            return new Date(nextCourseData.dateEnd).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
        }
        return '';
    }

    return <div className="page">
        <header className="clock">
            <p className="hour">{ hour.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' }) }</p>
            <p className="day">{ new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' }) }</p>
        </header>
        <div className="cards-dashboard">
            { nextCourseData &&  <div className="card-next">
                <h2 className="card__title--left card__title--left-orange">Prochain élève</h2>
                <p className="card-next-date">{getCourseData()}</p>
                <div className="card-next__grid">
                    {nextCourseData && <NextCourse next={nextCourseData}/>}
                    <div className="card-next__item card-next__item--column item-book">
                        <div className="item-student__infos">
                            <h3 className="item-student__hour">Livret de conduite</h3>
                            {pourcentCourses && <p className="item-student__percent">{pourcentCourses}%</p>}
                        </div>
                    </div>
                    <div className="card-next__item item-hours">
                        <Award />
                        <div className="item-student__infos">
                            {nbCourses && <p className="item-student__hour">{nbCourses+'h'} de conduite</p>}
                        </div>
                    </div>
                    <div className="card-next__item item-location">
                        <Location />
                        {nextCourseData && <CoursePlace next={nextCourseData}/>}
                    </div>
                </div>
            </div>}
            <div className="card-trip">
                <h2 className="card__title--left card__title--left-pl">Prochain parcours</h2>
                <Map isGeoloc={false} minMap={true} />
            </div>
            <div className="card-courses">
                <h2 className="card__title--left">Prochains cours</h2>
                <div className="timeline">
                    <TimelineItem type="course" title="17h00 - 18h30" isFirst={true} current={currentUser} />
                    <TimelineItem type="course" title="17h00 - 18h30" isFirst={false} current={currentUser} />
                </div>
            </div>
            {
                user && user.payment &&  <div className="card-payments-instructor">
                    <h2 className="card__title--left">Derniers paiements</h2>
                    {user && <PaymentCard carte={user.payment}/>}
                    <div className="timeline">
                        <TimelineItem title="15 Mai" />
                        <TimelineItem title="15 Mai" />
                        <TimelineItem title="15 Mai" />
                    </div>
                </div>
            }
        </div>
    </div>
}


export default DashboardIntitutor
