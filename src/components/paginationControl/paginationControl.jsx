
import React from 'react'
import styles from './paginationControl.module.css'
import Link from 'next/link'
const PaginationControl = ({ page, search, totalPages }) => {


    const lastPage = page === totalPages


    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <Link key={i} href={`/blog?page=${i}`}>
                <div className={`${styles.pageButton} ${page === i ? styles.active : ''}`}>
                    {i}
                </div>
            </Link>
        );
    }


    return (
        <>
            <div className={styles.buttonContainer}>

                <Link
                    href={{
                        pathname: './blog',
                        query: {
                            ...(search ? { search } : {}),
                            page: page > 1 ? page - 1 : 1
                        }
                    }}
                    className={`${styles.prev} ${page === 1 ? styles.disable : ''}`}>
                    prev
                </Link>
                <div className={styles.buttonPage}>
                    {buttons}
                </div>

                <Link
                    href={{
                        pathname: './blog',
                        query: {
                            ...(search ? { search } : {}),
                            page: page + 1
                        }
                    }}
                    className={`${styles.next} ${lastPage ? styles.disable : ''}`}>
                    next
                </Link>

            </div>
        </>
    )
}

export default PaginationControl