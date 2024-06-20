'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/public/icons/icons';
import { LendsqrLogo, NotificationIcon, SignOutIcon, DropDown } from '@/public/icons/icons';
import styles from './navbar.module.scss';
import Avatar from '@/public/icons/avatar.svg';
import PopOver from '@/components/ui/reusables/PopOver/PopOver';
import { useAuth } from '@/components/utils/context/authContext';
import { useApi } from '@/components/utils/context/apiContext';

function Navbar() {
  const { apiData, filterData } = useApi();
  const router = useRouter();
  const { signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSignOut = () => {
    signOut();
    router.push('/Login');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterData(searchTerm, 'username'); 
  };

  return (
    <nav className={`flex ${styles.navContainer}`}>
      <div className={`flex ${styles.firstContent}`}>
        <LendsqrLogo />
        <span>
          <form
            className={`full-width align-y flex ${styles.searchBar}`}
            onSubmit={handleSearch}
            id="search-bar"
            role="search"
            aria-label="Search for products"
          >
            <input
              type="search"
              className="full-width full-height"
              placeholder="Search"
              aria-label="Search for products"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </span>
      </div>
      <div className={`flex ${styles.secondContent}`}>
        <span>Docs</span>
        <NotificationIcon />
        <span>
        </span>
        <PopOver
          radius={10}
          className={`${styles.action}`}
          wrapper={
            <>
              <Image src={Avatar} alt="user_image" />
              <span className={`flex align-y`}>
                <DropDown />
              </span>
            </>
          }
        >
          <button onClick={handleSignOut}>
            <SignOutIcon />
            Sign Out
          </button>
        </PopOver>
      </div>
    </nav>
  );
}

export default Navbar;
