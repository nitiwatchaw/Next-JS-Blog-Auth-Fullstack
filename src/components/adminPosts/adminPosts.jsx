
import { getPosts } from '@/lib/data'
import styles from './adminPosts.module.css'
import { getUsers } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '../deleteButton/deleteButton';
import SearchAdminPost from '../searchAdmin/searchAdmin';
const AdminPost = async ({ posts, page, totalPages, search }) => {



    const users = await getUsers()


    const userMap = {};
    users.forEach(user => {
        userMap[user._id] = user.username;
    });


    const lastPage = page === totalPages


    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <Link key={i} href={`/admin/post?page=${i}`}>
                <div className={`${styles.pageButton} ${page === i ? styles.active : ''}`}>
                    {i}
                </div>
            </Link>
        );
    }


    return (
        <>
            <div className={styles.container}>
                <h1>Posts</h1>
                <SearchAdminPost search={search} />
                {posts.map(post => {
                    return (
                        <div className={styles.postContainer} key={post.id}>
                            <div className={styles.post} >
                                <Link href={`/admin/post/${post.slug}`} className={styles.image}>
                                    {post?.img ? <Image src={post.img} alt='' fill className={styles.img} /> :
                                        <Image src='/noimg.png' alt='' fill className={styles.img} />
                                    }
                                </Link>
                                <span className={styles.postTitle}>
                                    {post?.title?.length >= 60
                                        ? post.title.substring(0, 60)
                                        : `${post?.title}...`}
                                </span>
                                <DeleteButton post={post} />
                            </div>
                            <div className={styles.user}>
                                by:  {userMap[post.userId]}
                            </div>
                        </div>
                    )
                })
                }

            </div >
            <div className={styles.buttonContainer}>

                <Link
                    href={`/admin/post?page=${page > 1 ? page - 1 : 1}`}
                    className={`${styles.prev} ${page === 1 ? styles.disable : ''}`}>
                    prev
                </Link>
                <div className={styles.buttonPage}>
                    {buttons}
                </div>

                <Link
                    href={`/admin/post?page=${page + 1}`}
                    className={`${styles.next} ${lastPage ? styles.disable : ''}`}>
                    next
                </Link>

            </div>
        </>
    )
}

export default AdminPost