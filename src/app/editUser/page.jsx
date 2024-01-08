import React from 'react'
import EditUserForm from '@/components/editUserForm/page'
import { auth } from '@/lib/auth'

const EditUserPage = async () => {

    const session = await auth()


    return (
        <>
            <EditUserForm
                id={session?.user?.id}
                username={session?.user?.username}
                email={session?.user?.email}
                img={session?.user?.img}
            />
        </>
    )
}

export default EditUserPage