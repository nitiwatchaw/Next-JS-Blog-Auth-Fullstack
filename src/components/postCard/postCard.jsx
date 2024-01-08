import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'



const PostCard = ({ post }) => {

    const formattedDate = post?.createdAt ? post.createdAt.toString().slice(0, 10) : '';

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={post?.img || "/noimg.png"} alt="" fill className={styles.img} sizes='width:100%' />
            </div>
            <div className={styles.bottom}>
                <div className={styles.wrapHead}>
                    <h1 className={styles.title}>{post?.title}</h1>
                    <p className={styles.desc}>{post?.desc}</p>
                </div>
                <div className={styles.wrap}>
                    <p className={styles.date}>{formattedDate}</p>
                    <Link href={`/blog/${post?.slug}`} passHref>
                        <p className={styles.link}>READ MORE</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard