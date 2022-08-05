// react imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";

//paginas
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Dashboard from "../pages/Dashboard/dashboard";
import { PagesContainer } from "../styles/styles";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../pages/Profile/Profile";

//componentes

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
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
