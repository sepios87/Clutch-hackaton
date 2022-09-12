import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { LoginContexte } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { state, dispatch } = useContext(LoginContexte);

    const onSubmit = (credentials) => {
        dispatch({ type: 'login_start' });

        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((e) => {
                if (e.user == null) {
                    throw new Error();
                } else {
                    dispatch({
                        type: 'login_success',
                        payload: {
                            user: credentials.username,
                            role: e.user.role,
                            id: e.user.id,
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
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    {state.user && <Navigate to="/dashboard" />}
                    <LoginForm onSubmit={onSubmit} disabled={state.loading} />
                </div>
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

export default Login;
