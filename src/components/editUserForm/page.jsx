'use client'
import React, { useState } from 'react'
import styles from './editUserForm.module.css'
import { useFormState } from 'react-dom';
import { editUser } from '@/lib/action'
import Link from 'next/link';


const EditUserForm = ({ id, username, email, img }) => {


    const [state, formAction] = useFormState(editUser, undefined)

    const [name, setName] = useState(username)
    const [updataemail, setEmail] = useState(email)
    const [updateImg, setImg] = useState(img)




    return (
        <div>
            <form action={formAction} className={styles.container}>
                <h1>EditUser</h1>
                <input type="hidden" name='id' placeholder="username" value={id} />
                <input type="hidden" name='username' placeholder="username" value={name} />
                <input type="text" name="username" placeholder="username" value={name} onChange={(e => setName(e.target.value))} />
                <input type="text" name="email" placeholder="email" value={updataemail} onChange={(e => setEmail(e.target.value))} />
                <input type="text" name="img" placeholder="image" value={updateImg} onChange={(e => setImg(e.target.value))} />
                <button>Edit</button>
                {state?.success}
                {state?.error}
            </form>
            <Link href='/userDetail' className={styles.button}>Cancle</Link>
        </div>
    )
}

export default EditUserForm