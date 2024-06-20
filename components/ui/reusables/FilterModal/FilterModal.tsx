import React, { useState, useContext } from 'react';
import styles from './filtermodal.module.scss';

import { useApi } from '@/components/utils/context/apiContext';

type Props = {
  column: string;
  onClose: () => void;
  onReset: () => void;
};

function FilterModal({ column, onClose, onReset }: Props) {
  const { filterDataByOptions } = useApi();

  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const onResetFilter = () => {
    onReset();
  };

  const handleFilter = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    filterDataByOptions(filters);
    onClose();
  };

  return (
    <form
      className={styles.modal}
      onSubmit={handleFilter}
      aria-label="Filter Modal"
      id="filter-modal"
      role="dialog"
    >
      <div className={styles.modalContent}>
        <div className={styles.filterFields}>
          <span>
            <p>Organization</p>
            <select
              name="organization"
              value={filters.organization}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
          </span>
          <span>
            <p>Username</p>
            <input
              type="text"
              name="username"
              placeholder="User"
              value={filters.username}
              onChange={handleChange}
            />
          </span>
          <span>
            <p>Email</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={filters.email}
              onChange={handleChange}
            />
          </span>
          <span>
            <p>Date</p>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={filters.date}
              onChange={handleChange}
            />
          </span>
          <span>
            <p>Phone Number</p>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={filters.phoneNumber}
              onChange={handleChange}
            />
          </span>
          <span>
            <p>Status</p>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </span>
        </div>
        <div className={styles.modalButtons}>
          <button onClick={onResetFilter} type="button">
            Reset
          </button>
          <button type="submit">Filter</button>
        </div>
      </div>
    </form>
  );
}

export default FilterModal;