import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { useReducer, createContext } from 'react';
import './App.scss';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Creneaux from './pages/Creneaux';
import Profil from './pages/Profil';
import { Messages } from './pages/Messages';
import { Discussion } from './pages/Discussion';
import Moniteur from './pages/Moniteur';
import Notifications from './pages/Notifications';
import Cours from './pages/Cours';
import Waiting from './components/Waiting';
import MapStudent from "./pages/MapStudent";
import ProfileEdit from "./pages/ProfileEdit";

const initialState = {
    loading: false,
    error: false,
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'login_start':
            return {
                loading: true,
                error: false,
            };
        case 'login_success':
            return {
                loading: false,
                error: false,
                user: {
                    user: action.payload.user,
                    role: action.payload.role,
                    id: action.payload.id,
                },
            };
        case 'login_error':
            return {
                loading: false,
                error: true,
            };
        case 'logout':
            return {
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export const LoginContexte = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function RequireAuth({ children, redirectTo }) {
        return state.user ? children : <Navigate to={redirectTo} />;
    }

    return (
        <LoginContexte.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Routes>
                    <Route index={true} path="/" element={<Waiting />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Dashboard />
                                <Navbar role={state.user?.role} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Notifications />
                                <Navbar role={state.user?.role} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/messages"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Messages />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/creneaux"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Creneaux />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profil"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Profil />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profil/modifier"
                        element={
                            <RequireAuth redirectTo="/login">
                                <ProfileEdit />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/discussion/:id"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Discussion />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/moniteur/:id"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Moniteur />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/map"
                        element={
                            <RequireAuth redirectTo="/login">
                                <MapStudent />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/cours"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Cours />
                                <Navbar role={state.user?.role}/>
                            </RequireAuth>
                        }
                    />
                    
                </Routes>
            </BrowserRouter>
        </LoginContexte.Provider>
    );
}

export default App;
