'use client';
import { useEffect, useState } from 'react';
import styles from './addpostForm.module.css';
import { addPost } from '@/lib/action';
import { useFormState } from 'react-dom';
import Link from 'next/link';
const AddpostForm = ({ userId , username }) => {

    
    const [state, formAction] = useFormState(addPost, undefined);

    const [formData, setFormData] = useState({
        userId,
        title: '',
        slug: '',
        img: '',
        desc: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const handleSubmit = async () => {
            setFormData({
                title: '',
                slug: '',
                img: '',
                desc: '',
            });
        };

        if (!state?.error) {
            handleSubmit();
        }
    }, [state]);




    return (
        <form action={formAction} className={styles.container} >
            <h1>Add New Post</h1>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="userName" value={username} />
            <input type="text" name="title" placeholder="title" value={formData.title} onChange={handleInputChange} />
            <input type="text" name="slug" placeholder="slug" value={formData.slug} onChange={handleInputChange} />
            <input type="text" name="img" placeholder="img" value={formData.img} onChange={handleInputChange} />
            <textarea name="desc" cols="30" rows="10" value={formData.desc} onChange={handleInputChange}></textarea>
            <button type="submit">Add</button>
            <Link href='/blog' className={styles.btnBack}>Go to Blog</Link>
            {state && state?.error}
            {state && state?.complete}
        </form>
    );
}

export default AddpostForm;