import React from 'react';
import Layout from '../components/Dashboard/Layout/Layout';
import UserTag from '../components/ui/reusables/userTag/UserTag';
import Table from '../components/Dashboard/Table/Table';
import styles from '../app/Dashboard/page.module.scss';
import ProtectedRoute from '@/components/utils/ProtectedRoute';
import {AuthProvider} from '@/components/utils/context/authContext';
import LayoutWithAuth from '@/components/ui/LayoutWithAuth';
import Dashboard from '../components/Dashboard/Dashboard';

function page() {
  return (
    // <LayoutWithAuth>
      <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
    // </LayoutWithAuth>
  );
}

export default page;
