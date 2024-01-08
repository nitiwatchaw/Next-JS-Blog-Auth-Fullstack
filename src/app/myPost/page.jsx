import React from 'react'
import styles from './myPost.module.css'
import PostCard from '@/components/postCard/postCard';
import { auth } from '@/lib/auth';
import NoPost from '@/components/noPost/noPost';

export const generateMetadata = async () => {


    return {
        title: "My Post",
        description: "My Post"
    }
}

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog", { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Something went wrong");
    }

    return res.json();
};

const MyPost = async () => {


    const posts = await getData()

    const user = await auth()

    const userID = user.user.id

    const myPosts = posts.filter(post => post.userId === userID);


    return (
        <div className={styles.blog}>
            <div className={styles.wrapHeader}>
                <h1 className={styles.header}>My Blog</h1>
            </div>
            <div className={styles.container}>
                {
                    myPosts.length >= 1 ? myPosts?.map((post) => (
                        <div className={styles.post} key={post.id}>
                            <PostCard post={post} />
                        </div>
                    )) : <NoPost />
                }
            </div>
        </div>
    )
}

export default MyPost