'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@/components/Dashboard/Layout/Layout';
import Loader from '@/components/ui/reusables/Loader/Loader';
import { useEffect, useState } from 'react';
import { useApi } from '@/components/utils/context/apiContext';
import styles from './page.module.scss';
import { BackArrowIcon } from '@/public/icons/icons';

const UserDetailsPage = ({ params }: { params: { username: string } }) => {
  const { apiData, fetchData } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const username = params.username;

  useEffect(() => {
    const loadUserData = async () => {
      if (username) {
        await fetchData();  
        setLoading(false);
      } else {
        router.push('/');
      }
    };

    loadUserData();
  }, [username, fetchData, router]);

  if (loading) {
    return <Loader />;
  }

  if (!apiData) {
    return <p>No user data found.</p>;
  }

  const user = apiData.filter((user) => user.username === username)[0];

  if (!user) {
    return <p>No user data found for username: {username}</p>;
  }

  return (
    <Layout>
      <div className={styles.userDetails}>
        <Link className='flex' href={'/'}>
          <BackArrowIcon /> Back to Users
        </Link>
        <span className={`flex ${styles.user}`}>
          <h1>User Details Page for {username}</h1>
          <span className={`flex items-center ${styles.buttons}`}>
            <button>Blacklist User</button>
            <button>Activate User</button>
          </span>
        </span>
        <div className={`flex ${styles.firstcontainer}`}>
        <span className="flex items-center">
          <img src={user.avatar} width={20} height={20} alt="" />
          <h3>{user.fullName}</h3>
          </span>
          <span className='flex flex-col'>
           <p> User's Tier </p>
          </span>
          <span className="flex flex-col">
            <h3>{user.accountBalance}</h3>
            <p>{user.email}</p>
          </span>
        </div>
        <div className={`${styles.section} ${styles.personalInfo}`}>
          <h2>Personal Information</h2>
          <p><span>Full Name:</span> {user.fullName}</p>
          <p><span>Phone Number:</span> {user.phone}</p>
          <p><span>Email Address:</span> {user.email}</p>
          <p><span>BVN:</span> {user.bvn}</p>
          <p><span>Gender:</span> {user.gender}</p>
          <p><span>Marital Status:</span> {user.maritalStatus}</p>
          <p><span>Children:</span> {user.children}</p>
          <p><span>Type of Residence:</span> {user.residence}</p>
        </div>
        <div className={`${styles.section} ${styles.educationEmployment}`}>
          <h2>Education and Employment</h2>
          <p><span>Level of Education:</span> {user.educationLevel}</p>
          <p><span>Employment Status:</span> {user.employmentStatus}</p>
          <p><span>Sector of Employment:</span> {user.employmentSector}</p>
          <p><span>Duration of Employment:</span> {user.employmentDuration}</p>
          <p><span>Office Email:</span> {user.officeEmail}</p>
          <p><span>Monthly Income:</span> {user.monthlyIncome}</p>
          <p><span>Loan Repayment:</span> {user.loanRepayment}</p>
        </div>
        <div className={`${styles.section} ${styles.socials}`}>
          <h2>Socials</h2>
          <p><span>Twitter:</span> {user.twitter}</p>
          <p><span>Facebook:</span> {user.facebook}</p>
          <p><span>Instagram:</span> {user.instagram}</p>
        </div>
        <div className={`${styles.section} ${styles.guarantor}`}>
          <h2>Guarantor</h2>
          <p><span>Full Name:</span> {user.guarantorName}</p>
          <p><span>Phone Number:</span> {user.guarantorPhone}</p>
          <p><span>Email Address:</span> {user.guarantorEmail}</p>
          <p><span>Relationship:</span> {user.relationshipWithGuarantor}</p>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetailsPage;
