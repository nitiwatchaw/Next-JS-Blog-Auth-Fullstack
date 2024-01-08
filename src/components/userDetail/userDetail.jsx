import React from 'react'
import styles from './userDetail.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { CiEdit } from "react-icons/ci";
import { auth } from '@/lib/auth';

const UserDetailComponent = async ({ user }) => {


    const session = await auth()



    return (
        <>
            <div className={styles.container}>
                <div className={styles.bgImage}>
                    {
                        user?.img || user?.image ?
                            <Image src={user?.img || user?.image} alt='' fill /> :
                            <Image src='/noavatar.png' alt='' fill />
                    }

                </div>
                <div className={styles.image}>
                    {
                        user?.img || user?.image ?
                            <Image src={user?.img || user?.image} alt='' fill /> :
                            <Image src='/noavatar.png' alt='' fill />
                    }

                </div>
                <div className={styles.line}></div>
                <div className={styles.wrapDetail}>
                    <div className={styles.detail}>
                        <h2>Detail</h2>
                        <div className={styles.name}>
                            <h4>Name</h4>
                            <p> {user?.username || user?.name}</p>
                        </div>
                        <div className={styles.email}>
                            <h4>Email</h4>
                            <p> {user?.email}</p>
                        </div>
                        <div className={styles.profileImage}>
                            <h4>Image</h4>
                            <p> {user?.img || user?.image ? user?.img || user?.image : "No image"}</p>
                        </div>

                        {
                            session?.user.username === user?.username ? <Link href='/editUser' className={styles.edit}><CiEdit /></Link> : null
                        }
                    </div>
                </div>

            
            </div>
        </>
    )
}

export default UserDetailComponent