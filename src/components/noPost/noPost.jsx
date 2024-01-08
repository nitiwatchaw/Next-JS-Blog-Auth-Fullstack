
import React from 'react'
import styles from './noPost.module.css'
import Link from 'next/link'
const NoPost = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <p>Sorry you have no post</p>
                <p>Would you like to post something</p>
            </div>
            <Link href='/addPost' className={styles.link}>Add Post</Link>
        </div>
    )
}

export default NoPost