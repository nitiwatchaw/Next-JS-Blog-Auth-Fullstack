
import React from 'react'
import styles from './userLiked.module.css'
import { getUsers } from '@/lib/data';
import Image from 'next/image';
const UserLiked = async ({ post }) => {


    const users = await getUsers()

    const userMap = {};
    users.forEach(user => {
        userMap[user._id] = user.img;
    });

    const isAdded = post?.likedBy



    const displayImg = isAdded?.map((e) => {
        return userMap[e]
    })

    return (
        <div className={styles.container}>
            {displayImg?.map((img, i) => (
                <div className={styles.imgCover} key={i}>
                    <Image src={img} alt='' fill sizes='width: 40px height:40px' className={styles.image} />
                </div>
            ))}
        </div>
    )
}

export default UserLiked