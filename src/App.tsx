import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { ConfigProvider, theme } from 'antd';
import { ProtectedRoutes, PublicRoutes } from './utils/route';
import { Main } from './components/main';
import { HomePage } from './page/home';

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Routes>
        {/** Protected Routes */}
        {/** Wrap all Route under ProtectedRoutes element */}
        <Route path="/" element={<Main />}>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="" element={<HomePage />} />
          </Route>
        </Route>
        {/** Fallback route for all other routes */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
