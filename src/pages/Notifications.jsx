import React, {useEffect, useContext} from 'react';
import { LoginContexte } from '../App';

import NotificationInstructor from '../components/NotificationInstructor.jsx';
import NotificationStudent from '../components/NotificationStudent';

import './Notifications.scss';

const Moniteur = () => {

    
    const { state, dispatch } = useContext(LoginContexte);


    return (<div>
        {state.user.role === 'instructor' && <NotificationInstructor />}
        {state.user.role === 'student' && <NotificationStudent />}
    </div>
    );
};

export default Moniteur;
