'use client'

import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import styles from './styles.module.css'
import Link from 'next/link'
import { handleGithubLogin } from '@/lib/action'
import { login } from '@/lib/action'
import { useRouter } from 'next/navigation'
const LoginForm = () => {

    const [state, formAction] = useFormState(login, undefined)

    const router = useRouter()

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <form className={styles.form} action={formAction}>
                    <input type="text" placeholder='username' name='username' />
                    <input type="password" placeholder='password' name='password' />
                    <button>Login with Credentials</button>
                </form>

                <form className={styles.formGit} action={handleGithubLogin}>
                    <button>Login with Github</button>
                </form>
                {state?.error}
                <Link href='/register'>No account?</Link>
            </div>

        </div>
    )
}

export default LoginForm