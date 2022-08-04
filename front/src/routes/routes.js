// react imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";

//paginas
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Dashboard from "../pages/Dashboard/dashboard";

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
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
