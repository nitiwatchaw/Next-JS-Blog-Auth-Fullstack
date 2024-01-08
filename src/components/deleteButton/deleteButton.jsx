
import React from 'react'
import styles from './deleteButton.module.css'
import { deletePost } from '@/lib/action'
import { AiTwotoneDelete } from "react-icons/ai";
const DeleteButton = ({ post }) => {
    return (
        <form action={deletePost}>
            <input type="hidden" name='id' value={post.id} />
            <button className={styles.postButton}>
                <AiTwotoneDelete />
            </button>
        </form>
    )
}

export default DeleteButton