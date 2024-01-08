'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './links.module.css'
import NavLink from "./navLink/navLink"
import Link from 'next/link'
import { handleLogout } from '@/lib/action'
import { AiFillHome } from "react-icons/ai";
import { FaCircleInfo } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaBlogger } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

const Links = ({ session }) => {


    const [open, setOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    const menuRef = useRef()

    const links = [
        {
            title: "Homepage",
            path: '/',
            icon: <AiFillHome />
        },
        {
            title: "About",
            path: '/about',
            icon: <FaCircleInfo />
        },
        {
            title: "Contact",
            path: '/contact',
            icon: <RiContactsBook2Fill />
        },
        {
            title: "Blog",
            path: '/blog',
            icon: <FaBlogger />
        },
    ]

    const logout =
    {
        title: 'Logout',
        icon: <RiLogoutBoxLine />
    }


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(true);
            }
        };

        const handleResize = () => {
            setWindowWidth((prevWidth) => {
                if (prevWidth > 768) {
                    setOpen(false);
                }
                return window.innerWidth;
            });
        };

        setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className={`${styles.container} `}>

                <div ref={menuRef} className={`${styles.links} ${open ? styles.mobileActive : ''}`}>

                    <div className={styles.buttonContainer}>
                        <button className={styles.btnClose} onClick={() => setOpen(!open)}>
                            <RiArrowLeftLine />
                        </button>
                    </div>

                    <div className={styles.menuList}>
                        <div className={styles.wrapLink}>
                            {links.map(link => (
                                <NavLink item={link} key={link.title} />
                            ))}
                            <div className={styles.menuAdmin}>
                                {session?.user?.isAdmin &&
                                    <NavLink item={{ title: "Admin", path: '/admin', icon: <RiAdminFill /> }} />
                                }
                                {
                                    session?.user ?
                                        <form action={handleLogout}>
                                            <button className={styles.logoutMobile}>
                                                <p> <FaChevronRight /></p>
                                                <p><RiLogoutBoxLine /></p>
                                                <p>{logout.title}</p>
                                            </button>
                                        </form> :
                                        <div className={styles.loginMobile}>
                                            <NavLink item={{ title: "Login", path: '/login', icon: <RiLoginBoxLine /> }} />
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                    {session?.user ?
                        <>
                            <div className={styles.profile}>
                                <Link href='/userDetail' className={styles.containerImg} >
                                    <Image src={session?.user?.img || session?.user?.image || "/noavatar.png"} alt="" className={styles.img} width={40} height={40} />
                                </Link>
                                <Link href='/userDetail' >
                                    <p>
                                        {session?.user?.username ?
                                            session?.user?.username?.length > 5 ? `${session?.user?.username.substring(0, 5)}...` : session?.user?.username?.substring(0, 5)
                                            : session?.user?.name?.length > 5 ? `${session?.user?.name.substring(0, 5)}...` : session?.user?.name?.substring(0, 5)}
                                    </p>
                                </Link>
                                <form action={handleLogout}>
                                    <button className={styles.logout}>
                                        {logout.title}
                                    </button>
                                </form>
                            </div>


                            <div className={styles.profileMobile}>
                                <Link href='/userDetail' >
                                    <Image src={session?.user?.img || session?.user?.image || "/noavatar.png"} alt="" className={styles.img} width={40} height={40} />
                                </Link>
                                <Link href='/userDetail' className={styles.detailName}>
                                    <p>
                                        {session?.user?.username ?
                                            session?.user?.username
                                            : session?.user?.name}
                                    </p>
                                    <p>{session?.user?.isAdmin ? "Admin" : "User"}</p>
                                </Link>

                                <form action={handleLogout}>
                                    <button className={styles.logout}>
                                        {logout.title}
                                    </button>
                                </form>
                            </div>


                        </> :
                        <div className={styles.login}>
                            <NavLink item={{ title: "Login", path: '/login', icon: <RiLoginBoxLine /> }} />
                        </div>
                    }

                </div >
            </div >

            <button className={styles.btnOpen} onClick={() => setOpen(!open)}><MdMenuOpen /></button>
        </>
    )
}

export default Links