import React from 'react'
import styles from './footer.module.css'
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        nitiwatdev
      </div>
      <div className={styles.text}>
        Nitiwat Create Full stack Next JS @ All rights reserved.
      </div>
    </div>
  )
}

export default Footer