'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sideBar } from '@/components/utils/data/sidebar';
import { BriefcaseIcon, DropDown, HomeIcon } from '@/public/icons/icons';

import styles from './sidebar.module.scss';

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter(); 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (item: string) => {
    if (item === 'User') {
      router.push('/'); 
    } else {
      console.log('/')
    }
  };

  return (
    <div className={`flex ${styles.sidebarContainer} ${isExpanded ? styles.expanded : ''}`}>
      <span className="flex" onClick={() => handleItemClick('User')}>
        <BriefcaseIcon />
        {!isExpanded && <p>Switch Organization</p>}
        {!isExpanded && <DropDown />}
      </span>
      <span className="flex" onClick={() => handleItemClick('dashboard')}>
        <HomeIcon />
        {!isExpanded && <p>Dashboard</p>}
      </span>
      <ul>
        <p>Customers</p>
        {sideBar.customer.map((el) => (
          <li className="flex" key={el.title} onClick={() => handleItemClick(el.title)}>
            {el.icon}
            {!isExpanded && <p>{el.title}</p>}
          </li>
        ))}
      </ul>
      <ul>
        <p>Business</p>
        {sideBar.businesses.map((el) => (
          <li className="flex" key={el.title} onClick={() => handleItemClick(el.title)}>
            {el.icon}
            {!isExpanded && <p>{el.title}</p>}
          </li>
        ))}
      </ul>
      <ul>
        <p>Settings</p>
        {sideBar.settings.map((el) => (
          <li className="flex" key={el.title} onClick={() => handleItemClick(el.title)}>
            {el.icon}
            {!isExpanded && <p>{el.title}</p>}
          </li>
        ))}
      </ul>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </div>
    </div>
  );
}

export default SideBar;
