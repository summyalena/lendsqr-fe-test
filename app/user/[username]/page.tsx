'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Dashboard/Layout/Layout';
import Loader from '@/components/ui/reusables/Loader/Loader';
import { useEffect, useState } from 'react';
import { useApi } from '@/components/utils/context/apiContext';
import styles from './page.module.scss';

const UserDetailsPage = ({ params }: { params: { username: string } }) => {
  const { apiData, fetchData } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const username = params.username;

  useEffect(() => {
    const loadUserData = async () => {
      if (params.username) {
        await fetchData();
        setLoading(false);
      } else {
        router.push('/');
      }
    };
    
    loadUserData();
  }, [params.username, fetchData, router]);
 

  if (loading) {
    return <Loader />;
  }

  if (!apiData) {
    return <p>No user data found.</p>;
  }

  return (
    <Layout>
      <div className={styles.userDetails}>
        <h1>User Details Page for {username}</h1>
        {/* <div className={`${styles.section} ${styles.personalInfo}`}>
          <h2>Personal Information</h2>
          <p><span>Full Name:</span> {apiData.personalInformation.fullName}</p>
          <p><span>Phone Number:</span> {apiData.personalInformation.phoneNumber}</p>
          <p><span>Email Address:</span> {apiData.personalInformation.emailAddress}</p>
          <p><span>BVN:</span> {apiData.personalInformation.bvn}</p>
          <p><span>Gender:</span> {apiData.personalInformation.gender}</p>
          <p><span>Marital Status:</span> {apiData.personalInformation.maritalStatus}</p>
          <p><span>Children:</span> {apiData.personalInformation.children}</p>
          <p><span>Type of Residence:</span> {apiData.personalInformation.typeOfResidence}</p>
        </div>
        <div className={`${styles.section} ${styles.educationEmployment}`}>
          <h2>Education and Employment</h2>
          <p><span>Level of Education:</span> {apiData.educationAndEmployment.levelOfEducation}</p>
          <p><span>Employment Status:</span> {apiData.educationAndEmployment.employmentStatus}</p>
          <p><span>Sector of Employment:</span> {apiData.educationAndEmployment.sectorOfEmployment}</p>
          <p><span>Duration of Employment:</span> {apiData.educationAndEmployment.durationOfEmployment}</p>
          <p><span>Office Email:</span> {apiData.educationAndEmployment.officeEmail}</p>
          <p><span>Monthly Income:</span> {apiData.educationAndEmployment.monthlyIncome}</p>
          <p><span>Loan Repayment:</span> {apiData.educationAndEmployment.loanRepayment}</p>
        </div>
        <div className={`${styles.section} ${styles.socials}`}>
          <h2>Socials</h2>
          <p><span>Twitter:</span> {apiData.socials.twitter}</p>
          <p><span>Facebook:</span> {apiData.socials.facebook}</p>
          <p><span>Instagram:</span> {apiData.socials.instagram}</p>
        </div>
        <div className={`${styles.section} ${styles.guarantor}`}>
          <h2>Guarantor</h2>
          <p><span>Full Name:</span> {apiData.guarantor.fullName}</p>
          <p><span>Phone Number:</span> {apiData.guarantor.phoneNumber}</p>
          <p><span>Email Address:</span> {apiData.guarantor.emailAddress}</p>
          <p><span>Relationship:</span> {apiData.guarantor.relationship}</p>
        </div> */}
      </div>
    </Layout>
  );
};

export default UserDetailsPage;
