import Link from 'next/link';
import React from 'react';
import styles from './NotFound.module.css'; 

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <p className={styles.link}>Return Home</p>
      </Link>
    </div>
  );
};

export default NotFound;