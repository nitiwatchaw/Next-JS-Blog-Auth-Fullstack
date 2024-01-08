import React from 'react'
import styles from './admin.module.css'
import Link from 'next/link'
import { FaBlogger } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const metadata = {
  title: 'Admin Page',
  description: 'Admin description',
}

const AdminPage = () => {


  return (
    <div>
      <div className={styles.header}>Category</div>

      <div className={styles.container}>

        <div className={styles.post}>
          <Link href='/admin/post'><span>Post</span> <span><FaBlogger /></span></Link>

          <div className={styles.desc}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quam, praesentium voluptate consequatur facilis quos aperiam
              itaque porro ipsa cupiditate dolorem, officia ipsum iusto
              voluptates harum, laborum reprehenderit perspiciatis ea vitae.</p>
          </div>
        </div>
        <div className={styles.line}>

        </div>
        <div className={styles.user}>
          <Link href='/admin/user'><span><FaUserCircle /></span> <span>User</span></Link>
          <div className={styles.bgIcon2}><FaUserCircle /></div>
          <div className={styles.desc}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quam, praesentium voluptate consequatur facilis quos aperiam
              itaque porro ipsa cupiditate dolorem, officia ipsum iusto
              voluptates harum, laborum reprehenderit perspiciatis ea vitae.</p>
          </div>
        </div>
      </div >
    </div>
  )
}

export default AdminPage