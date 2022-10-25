// react imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';

//paginas
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Error from '../pages/Error/Error';
import DUser from '../pages/DUser/DUser';
import Company from '../pages/Company/Company';
import Protocols from '../pages/Protocols/Protocols';
import Details from '../pages/Protocols/Details/Details';
import Customers from '../pages/Customers/Customers';

import { PagesContainer } from '../styles/styles';
//componentes
import Navbar from '../components/Navbar/Navbar';
import Priorities from '../pages/Priorities/Priorities';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                {/*

                Exemplo de rota: 
                // Menu e Chamados sao paginas e componentes que precisam estar previamente importados
                <Route 
                path="/chamados"
                element={
                    <PrivateRoute>
                        <Menu/> 
                        <Chamados/>
                    </PrivateRoute>
                }/>
                
                */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Login />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PrivateRoute>
                            <Register />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/inactiveAccount"
                    element={
                        <PrivateRoute>
                            <DUser />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar />
                                <Dashboard />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar />
                                <Profile />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/company/:tab"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="company" />
                                <Company />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/protocols/:tab"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="protocols" />
                                <Protocols />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/protocols/details/:idProtocol/:tab"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="protocols" />
                                <Details />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/:tab"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="customers" />
                                <Customers />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                {/* {<Route
                    path="/sectors"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="sectors" />
                                <Sectors />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />} */}
                <Route
                    path="/priorities"
                    element={
                        <PrivateRoute>
                            <PagesContainer>
                                <Navbar opt="priorities" />
                                <Priorities />
                            </PagesContainer>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/*"
                    element={<Error />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
