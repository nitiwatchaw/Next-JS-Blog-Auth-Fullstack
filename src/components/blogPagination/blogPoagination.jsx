import styles from './blogPoagination.module.css'
import PostCard from '../postCard/postCard'
import PaginationControl from '../paginationControl/paginationControl';
const BlogPagination = ({ posts, page, search, totalPages }) => {


    return (
        <>
            <div className={styles.container}>
                {posts.map((post) => (
                    <div className={styles.post} key={post._id}>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
            <PaginationControl
                posts={posts}
                page={page}
                search={search}
                totalPages={totalPages}
            />
        </>
    );
};

export default BlogPagination