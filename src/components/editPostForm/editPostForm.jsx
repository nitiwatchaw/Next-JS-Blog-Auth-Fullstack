'use client'
import { useState } from 'react';
import styles from './editPostForm.module.css'
import { useFormState } from 'react-dom';
import Link from 'next/link'
import { editPost } from '@/lib/action';


const EditPostForm = ({ postId, postTitle, postSlug, postImg, postDesc }) => {


    const [state, formAction] = useFormState(editPost, undefined);
    const [formData, setFormData] = useState({
        title: postTitle,
        slug: postSlug,
        img: postImg,
        desc: postDesc,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <>
            <form action={formAction} className={styles.container} >
                <h1>Edit Post</h1>
                <input type="hidden" name='postId' value={postId} />
                <input type="text" name="title" placeholder="title" value={formData.title} onChange={handleInputChange} />
                <input type="text" name="slug" placeholder="slug" value={formData.slug} onChange={handleInputChange} />
                <input type="text" name="img" placeholder="img" value={formData.img} onChange={handleInputChange} />
                <textarea name="desc" cols="30" rows="10" value={postDesc} onChange={handleInputChange} ></textarea>
                <button type="submit">Edit</button>
                <Link href={`/blog/${formData.slug}`} className={styles.btnBack}>Go to Blog</Link>
                {state && state?.error}
                {state && state?.success}
            </form>
        </>
    )
}

export default EditPostForm