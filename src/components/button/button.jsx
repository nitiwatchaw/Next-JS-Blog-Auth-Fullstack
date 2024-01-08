'use client'

import React from 'react'
import styles from './button.module.css'
import { useRouter } from 'next/navigation'
const Button = () => {
    const router = useRouter();
    const handleAddPostClick = () => {
        router.push('/addPost');
    };


    return (
        <button className={styles.addPostbtn} onClick={handleAddPostClick}>Add Post</button>
    )
}

export default Button