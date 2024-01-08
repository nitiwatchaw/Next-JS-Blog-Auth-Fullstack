'use client'
import React, { useState, useEffect } from 'react'
import styles from './navLink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight } from "react-icons/fa6";
const NavLink = ({ item }) => {
    const pathName = usePathname()
    const isItemActive = pathName === item.path || item.path !== '/' && pathName.startsWith(item.path);

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {

            window.removeEventListener('resize', handleResize);
        };
    })


    return (
        <div className={`${styles.container} ${isItemActive && styles.active}`}>
            <Link
                title={item.title}
                href={item.path}
                key={item.title}
                className={`${styles.cover}  `}
            >
                <p className={styles.list}><FaChevronRight /></p>
                <p className={styles.icon}>{item.icon}</p>
                <p>{windowWidth <= 1040 && windowWidth >= 768 ? item.icon : item.title}</p>

            </Link>
        </div>
    )
}

export default NavLink