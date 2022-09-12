import React, { useContext } from 'react';
import SignUpForm from '../components/SignUpForm';
import { Navigate } from 'react-router-dom';
import { LoginContexte } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const { state, dispatch } = useContext(LoginContexte);

    const onSubmit = (credentials) => {
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((e) => {
                if (e.error) {
                    throw new Error();
                } else {
                    dispatch({
                        type: 'login_success',
                        payload: {
                            user: credentials.username,
                            role: e.role,
                            id: e.id,
                        },
                    });
                }
            })
            .catch((err) => {
                dispatch({ type: 'login_error' });
                toast.error('Erreur de connexion', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="page">
            <div>
                {state.user && <Navigate to="/dashboard" />}
                <SignUpForm onSubmit={onSubmit} disabled={state.loading} />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default SignUp;
