import React from 'react';
import styles from './UserTag.module.scss';
import {UserActiveIcon} from '@/public/icons/icons';
import {UsersLoanIcon} from '@/public/icons/icons';
import {UsersSavingsIcon} from '@/public/icons/icons';

const icons = {
  activeUsers: UserActiveIcon,
  loans: UsersLoanIcon,
  savings: UsersSavingsIcon,
};

function UserTag({tag, figures, iconType}: {tag: string; figures: number; iconType: 'activeUsers' | 'loans' | 'savings'}) {
  const IconComponent = icons[iconType] as React.ComponentType<{className: string}>;

  return (
    <div className={`${styles.tagContainer}`}>
      <IconComponent className={styles.icon} />
      <h2>{tag}</h2>
      <p>{figures}</p>
    </div>
  );
}

export default UserTag;
