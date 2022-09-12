import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContexte } from '../App';
import { Navigate } from 'react-router-dom';
import DashboardIntitutor from '../components/DashboardIntitutor';
import DashboardStudent from '../components/DashboardStudent';
import ProfileEditInstitutorForm from "../components/ProfileEditInstitutorForm";
import {Header} from "../components/Header";

const Dashboard = () => {
    const { state, dispatch } = useContext(LoginContexte);

    return (
        <div className='page'>
            <Header title='Modifier le profil' path={'/dashboard'} />
            {state.user.role === 'instructor' && <ProfileEditInstitutorForm />}
            {state.user.role === 'student' && <DashboardStudent />}
        </div>
    );
};

export default Dashboard;
