import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { ConfigProvider, theme } from 'antd';
import { ProtectedRoutes, PublicRoutes } from './utils/route';
import { Main } from './components/main';
import { HomePage } from './page/home';
import { Emitter } from './utils/emitter';

function App() {
  let [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    Emitter.EventEmitter.addListener(Emitter.Event.Action.ChangeTheme, (result: any) => {
      setIsDarkMode(result)
    })
  }, [])

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#25aa1e',
      },
    }}>
      <div className={isDarkMode ? 'main dark-theme' : 'main light-theme'}>
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
      </div>
    </ConfigProvider>
  );
}

export default App;
