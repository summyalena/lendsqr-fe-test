import React from 'react';

import UserTag from '@/components/ui/reusables/userTag/UserTag';
import Table from '../Table/Table';
import styles from './Content.module.scss';
import { ApiProvider } from '@/components/utils/context/apiContext';

function Content() {
  return (
    <div className={`${styles.contentWrapper}`}>
       <h1>User</h1>
          <div className={styles.tagsContainer}>
            <UserTag tag='Active Users' figures={2453} iconType='activeUsers' />
            <UserTag tag='Users with Loans' figures={12453} iconType='loans' />
            <UserTag tag='Users with Savings' figures={102453} iconType='savings' />
            <UserTag tag='Users with Savings' figures={102453} iconType='savings' />
          </div>
          <Table />
      </div>
  )
}

export default Content;