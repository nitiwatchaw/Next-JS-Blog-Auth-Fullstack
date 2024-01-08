import React from 'react'
import { auth } from '@/lib/auth'
import UserDetailComponent from '@/components/userDetail/userDetail'
const UserDetail = async () => {

    const session = await auth()


    return (
        <>
            <UserDetailComponent user={session.user} />
        </>
    )
}

export default UserDetail