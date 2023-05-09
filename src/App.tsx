import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { ConfigProvider, theme } from 'antd';
import { ProtectedRoutes, PublicRoutes } from './utils/route';
import { Main } from './components/main';
import { HomePage } from './page/home';

function App() {
  return (<ConfigProvider theme={{
    algorithm: theme.darkAlgorithm,
  }}>
    <Routes>
      {/** Protected Routes */}
      {/** Wrap all Route under ProtectedRoutes element */}
      <Route path='*' element={<Navigate replace to="home" />} />
      <Route path="/" element={<Main />}>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  </ConfigProvider>);
}

export default App;
