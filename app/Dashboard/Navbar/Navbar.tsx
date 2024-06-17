'use client';

import React from 'react'
import Image from 'next/image';

import { DropDown, LendsqrLogo, NotificationIcon } from '@/public/icons/icons';
import { SearchIcon } from '@/public/icons/icons';
import styles from './navbar.module.scss';
import Avatar from '@/public/icons/avatar.svg';
import PopOver from '@/components/ui/reusables/PopOver';

function Navbar() {
  function handleSearch(searchTerm: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <nav className={`flex container ${styles.navContainer}`}>
      <div className={`flex ${styles.firstContent}`}>
      <LendsqrLogo />
      <span>
          <form
          className={`full-width align-y flex ${styles.searchBar}`}
          // onSubmit={(e) => {
          //   e.preventDefault();

          //   // handleSearch(searchTerm);
          // } }
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
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)} 
            />
          <button
            // type="submit"
            // className="button-fill"
            // aria-label="Search for products"
            // id={search - product - $} {...Math.random()} 
            // />
            // }
          >
           <SearchIcon />
        </button>
      </form>
    </span>
    </div>
    <div className={`flex ${styles.secondContent}`}>
    <span>Docs</span>
    <NotificationIcon />
    <span>
        <Image src={Avatar} alt="user_image" />
       {/* <PopOver>
         <Logout/>
       </PopOver> */}
       <DropDown/>
      </span>
      </div>
    </nav>
  )
}

export default Navbar