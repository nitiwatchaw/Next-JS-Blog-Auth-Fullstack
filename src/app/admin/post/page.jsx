import React from 'react'
import styles from './postDashboard.module.css'
import AdminPost from '@/components/adminPosts/adminPosts'
import AdminPostForm from '@/components/adminPostForm/adminPostForm'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import Loading from '@/app/loading'
import Link from 'next/link'
import { getPostsPagination } from '@/lib/data'
export const metadata = {
    title: 'Admin Post Dashboard',
    description: 'Admin description',
}
const PostDashboard = async ({ searchParams }) => {

    const session = await auth()

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 6

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
    const { totalPages, result: posts } = await getPostsPagination({ page, limit, query: search })


    return (
        <>
            <Link href='/admin' className={styles.link}>Back</Link>
            <div className={styles.container}>
                <div className={styles.post}>
                    <Suspense fallback={<><Loading /></>}>
                        <AdminPost
                            posts={posts}
                            page={page}
                            totalPages={totalPages}
                            search={search}
                        />
                    </Suspense>
                </div>
                <div className={styles.line}></div>
                <div className={styles.form}>
                    <AdminPostForm userId={session.user.id} username={session.user.username} />
                </div>

            </div>
        </>
    )
}

export default PostDashboard