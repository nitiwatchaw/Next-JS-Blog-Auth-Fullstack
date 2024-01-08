'use client'
import React from 'react'
import { useFormState } from 'react-dom';
import styles from './reactionbutton.module.css'
import { addLike } from '@/lib/action';
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
const ReactionButton = ({  username, id, postId, post }) => {


    const [state, formAction] = useFormState(addLike, undefined);


    const isAdded = post.likedBy

    return (
        <>
            <form action={formAction} >
                <input type="hidden" name='id' value={id} />
                <input type="hidden" name='username' value={username} />
                <input type="hidden" name='postId' value={postId} />

                <div className={styles.container}>
                    <div className={styles.state}>{state?.error}</div>
                    <button type="submit">
                        <span>
                            {isAdded?.includes(id) ? <FcLike /> : <FcLikePlaceholder />}
                        </span>
                        {isAdded?.length }
                    </button>
                </div>

            </form>
        </>
    )
}

export default ReactionButton