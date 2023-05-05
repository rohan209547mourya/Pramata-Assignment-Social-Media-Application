import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const RootLayout = () => (
  <>
    <Navbar />
    <div>
      <Outlet />
    </div>
  </>
);

export default RootLayout;
