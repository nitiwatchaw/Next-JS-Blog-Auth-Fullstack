'use client'
import React, { useEffect, useState, useRef } from 'react';
import styles from './userSearch.module.css'
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
const UserSearch = ({ search }) => {
    const router = useRouter();


    const initialRender = useRef(true);


    const [text, setText] = useState(search);
    const [query] = useDebounce(text, 600);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (!query) {
            router.push(`/admin/user`);
        } else {
            router.push(`/admin/user?search=${query}`);
        }
    }, [query]);

    return (
        <div className={styles.container}>
            <input
                type="search"
                placeholder='Search here...'
                className={styles.searchbar}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
        </div>
    );
}

export default UserSearch