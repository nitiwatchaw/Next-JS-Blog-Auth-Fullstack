import React from 'react'
import { getUser } from '@/lib/data';
import { getPosts } from '@/lib/data';
import styles from './user.module.css'
import UserDetailComponent from '@/components/userDetail/userDetail';
import PostCard from '@/components/postCard/postCard';
import Image from 'next/image';


export const generateMetadata = async ({ params }) => {
    const { slug } = params;

    const user = await getUser(slug);

    return {
        title: user?.username,
        description: user?.desc
    }
}



const SingleUserPage = async ({ params }) => {


    const { slug } = params;
    const user = await getUser(slug);


    const posts = await getPosts()


    const userPost = posts.filter(e => e.userId === user.id)
    // random image
    let randomImgData;
    randomImgData = userPost[Math.floor(Math.random() * userPost.length)]?.img;

    return (
        <div>
            <UserDetailComponent user={user} />

            <div className={styles.userPostContainer}>
                <Image src={randomImgData ? randomImgData : "/noimg.png"} alt='' fill className={styles.bgImage} />

                {userPost.length >= 1 ?
                    <div className={styles.userPost}>

                        <h2><span>{user.username}</span> Post</h2>
                        <div className={styles.container}>
                            {userPost?.map((post) => (
                                <div className={styles.post} key={post.id}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                        </div>
                    </div> : "No post"}


            </div>
        </div>
    )
}

export default SingleUserPage