'use client';

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';


import styles from './Table.module.scss';
import {ActivateUserIcon, DeleteUserIcon, DropsIcon, EyeIcon, FilterIcon, ArrowLeftIcon, ArrowRightIcon} from '@/public/icons/icons';
import PopOver from '@/components/ui/reusables/PopOver/PopOver';
import FilterModal from '@/components/ui/reusables/FilterModal/FilterModal';
import { ApiProvider, useApi } from '@/components/utils/context/apiContext';

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
}

const Table: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterColumn, setFilterColumn] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState<{top: number; left: number} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`https://run.mocky.io/v3/26db791b-2fb3-4b73-b4a2-2995d365b3ef`);
  //     const data = response.data;

  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const slicedData = data.slice(startIndex, startIndex + itemsPerPage);

  //     setUsers(slicedData);

  //     const totalItems = data.length;
  //     const totalPages = Math.ceil(totalItems / itemsPerPage);
  //     setTotalPages(totalPages);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const { apiData, fetchData } = useApi();

  useEffect(() => {
    if (apiData.length === 0) {
      fetchData();
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const slicedData = apiData.slice(startIndex, startIndex + itemsPerPage);
      setUsers(slicedData);

      const totalItems = apiData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);
    }
  }, [apiData, currentPage, itemsPerPage]);


  const handleFilterIconClick = (event: React.MouseEvent<HTMLTableHeaderCellElement>, column: string) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    setFilterColumn(column);
    setFilterPosition({top: targetRect.bottom, left: targetRect.left});
  };

  const handleCloseFilterModal = () => {
    setFilterColumn(null);
    setFilterPosition(null);
  };

  const handleResetFilter = (column: string, value: string) => {
    console.log(`Filter applied to ${column}: ${value}`);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <button key={1} onClick={() => handlePagination(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <button key='prev' onClick={() => handlePagination(currentPage - 1)}>
            <ArrowLeftIcon />
          </button>
        );
      }
      if (startPage > 3) {
        pageButtons.push(
          <span key='ellipsis' className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePagination(i)} className={i === currentPage ? styles.active : ''}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 2) {
        pageButtons.push(
          <span key='ellipsis' className={styles.ellipsis}>
            ...
          </span>
        );
      }
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <button key={totalPages} onClick={() => handlePagination(totalPages)}>
            {totalPages}
          </button>
        );
      }
      pageButtons.push(
        <button key='next' onClick={() => handlePagination(currentPage + 1)}>
          <ArrowRightIcon />
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <table>
          <thead>
          <tr>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'organization')}>
      <div className={styles.headerContent}>
        ORGANIZATION <FilterIcon />
      </div>
    </th>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'username')}>
      <div className={styles.headerContent}>
        USERNAME <FilterIcon />
      </div>
    </th>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'email')}>
      <div className={styles.headerContent}>
        EMAIL <FilterIcon />
      </div>
    </th>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'phone')}>
      <div className={styles.headerContent}>
        PHONE NUMBER <FilterIcon />
      </div>
    </th>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'createdAt')}>
      <div className={styles.headerContent}>
        DATE JOINED <FilterIcon />
      </div>
    </th>
    <th className={styles.tableHeader} onClick={(e) => handleFilterIconClick(e, 'status')}>
      <div className={styles.headerContent}>
        STATUS <FilterIcon />
      </div>
    </th>
  </tr>
          </thead>
          <tbody style={{position: 'relative'}}>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.createdAt}</td>
                <td>
                  <span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>{user.status}</span>
                </td>
                <td>
                  <PopOver
                    radius={10}
                    className={`${styles.action}`}
                    wrapper={
                      <span className={`flex align-y`}>
                        <DropsIcon />
                      </span>
                    }>
                    <ul className={`flex flex-col ${styles.ulList}`}>
                      <li style={{cursor: 'pointer'}}>
                        <Link href={`/user/${encodeURIComponent(user.username)}`}>
                            <EyeIcon /> View Details
                        </Link>
                      </li>
                      <li>
                        <DeleteUserIcon /> Blacklist User
                      </li>
                      <li>
                        <ActivateUserIcon /> Activate User
                      </li>
                    </ul>
                  </PopOver>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filterColumn && filterPosition && (
          <div className={`${styles.modal} ${styles.showModal}`}>
            <FilterModal column={filterColumn} onClose={handleCloseFilterModal} onReset={handleResetFilter} />
          </div>
        )}
      </div>
      <div className={`flex full-width ${styles.pagination}`}>
        <div className={styles.paginationInfo}>
          Showing{' '}
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.select}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>{' '}
          of {itemsPerPage * totalPages} entries
        </div>
        <div className={styles.paginationButtons}>{renderPaginationButtons()}</div>
      </div>
      </div>
  );
};

export default Table;
