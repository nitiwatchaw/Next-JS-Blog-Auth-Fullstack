import React from 'react'
import styles from './userDashboard.module.css'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import AdminUser from '@/components/adminUsers/adminUsers'
import AdminUserForm from '@/components/adminUserForm/adminUserForm'
import Loading from '@/app/loading'
import Link from 'next/link'
import { getUsersPagination } from '@/lib/data'
export const generateMetadata = async () => {


    return {
        title: "Admin User Dashboard",
        description: "Admin User Dashboard"
    }
}
const UserDashboard = async ({ searchParams }) => {

    const session = await auth()

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = Number(searchParams.limit)
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
    const { result: usersSearch } = await getUsersPagination({ page, limit, query: search })



    return (
        <>
            <Link href='/admin' className={styles.link}>Back</Link>
            <div className={styles.container}>


                <div className={styles.user}>
                    <Suspense fallback={<><Loading /></>}>
                        <AdminUser usersSearch={usersSearch} search={search} />
                    </Suspense>
                </div>
                <div className={styles.line}></div>
                <div className={styles.form}>
                    <AdminUserForm userId={session.user.id} />
                </div>

            </div>
        </>
    )
}

export default UserDashboard