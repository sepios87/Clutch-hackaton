import React, { useEffect, useState } from 'react'
import Creneau from '../components/Creneau';
import {Header} from "../components/Header";

import './Creneaux.scss'; 

const Creneaux = props => {
    const [meet, setMeet] = useState([]);

    const getData = () => {
        fetch('/api/sessions', {
            methode: 'GET', 
            credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            setMeet(data.filter(e => new Date(e.dateStart*1000).getDate() < new Date().getDate() && !e.studentUserId ))
          })
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className="creneaux">
            <Header path='/dashboard' title="Créneaux disponible" />
            <ul>
                {meet.map(meet => 
                    <li key={meet.id}>         
                        <Creneau key={meet.id} dateEnd={meet.dateEnd} dateStart={meet.dateStart} idplace={meet.placeId} />
                    </li>
                )}
            </ul>
        </div>
}


export default Creneaux
