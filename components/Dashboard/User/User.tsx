import React from 'react';
import styles from './UserDetails.module.scss'; 

interface UserDetailsProps {
  user: {
    id: number;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: string;
  };
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className={styles.userDetailsContainer}>
      <div className={styles.avatarContainer}>
        <img src={`url_to_avatar/${user.id}.jpg`} alt={`Avatar of ${user.username}`} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h2>{user.username}</h2>
          <p>User's Tier Info and Amount Info</p>
        </div>
      </div>
      <div className={styles.additionalInfoContainer}>
        <div className={styles.personalInfo}>
          <h3>Personal Info</h3>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Date Joined: {user.dateJoined}</p>
          <p>Status: {user.status}</p>
        </div>
        <div className={styles.educationInfo}>
          <h3>Education Info</h3>
          
        </div>
        <div className={styles.socialsInfo}>
          <h3>Socials Info</h3>
         
        </div>
        <div className={styles.guarantorInfo}>
          <h3>Guarantor Info</h3>
          
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
