import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContexte } from '../App';
import { Navigate } from 'react-router-dom';
import DashboardIntitutor from '../components/DashboardIntitutor';
import DashboardStudent from '../components/DashboardStudent';

const Dashboard = () => {
    const { state, dispatch } = useContext(LoginContexte);

    return (
        <div>
            {state.user.role === 'instructor' && <DashboardIntitutor />}
            {state.user.role === 'student' && <DashboardStudent />}
        </div>
    );
};

export default Dashboard;
