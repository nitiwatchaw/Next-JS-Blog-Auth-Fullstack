'use client'
import React from 'react'
import styles from './buttonMyPost.module.css'
import { useRouter } from 'next/navigation'


const ButtonMyPost = () => {

    // const getData = async () => {
    //     const res = await fetch("http://localhost:3000/api/blog", { cache: "no-store" });

    //     if (!res.ok) {
    //         throw new Error("Something went wrong");
    //     }

    //     return res.json();
    // };

    const router = useRouter();
    const handleAddPostClick = () => {
        router.push('/myPost');
    };

    return (
        <button onClick={handleAddPostClick} className={styles.myButton}>My Post</button>
    )
}

export default ButtonMyPost