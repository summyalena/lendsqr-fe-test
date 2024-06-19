import React, { useState } from 'react';
import styles from './filtermodal.module.scss';

type Props = {
  column: string;
  onClose: () => void;
  onReset: () => void;
};

function FilterModal({ column, onClose, onReset }: Props) {
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const onResetFilter = () => {
    onReset();
  };

  return (
    <div className={styles.modal}>
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
            type="email"
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
          <button onClick={onResetFilter}>Reset</button>
          <button onClick={onClose}>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
