import React from 'react';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';
import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <SideBar />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
