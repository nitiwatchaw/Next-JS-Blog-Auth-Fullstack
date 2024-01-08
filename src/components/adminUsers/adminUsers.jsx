import { getUsers } from '@/lib/data'
import styles from './adminUsers.module.css'
import Image from 'next/image'
import { deleteUser } from '@/lib/action'
import { RiDeleteBack2Fill } from "react-icons/ri";
import Link from 'next/link';
import UserSearch from '../userSearch/userSearch';
import { RiAdminFill } from "react-icons/ri";
const AdminUser = async ({ usersSearch, search }) => {

    const usersProps = JSON.stringify(usersSearch)
    const usersArray = JSON.parse(usersProps);

    return (
        <div className={styles.container}>
            <h1>Users</h1>
            <UserSearch users={usersArray} search={search} />
            {usersSearch.map(user => (
                <div className={styles.user} key={user.id}>
                    <Link href={`/user/${user?.id}`} className={styles.detail}>
                        <Image src={user?.img || "/noAvatar.png"} alt='' className={styles.image} width={80} height={80} />
                        <span className={styles.userTitle}>{user.username}</span>
                    </Link>
                    {
                        user?.isAdmin ?
                            <button className={styles.adminButton}>
                                <RiAdminFill />
                            </button>
                            :
                            <form action={deleteUser}>
                                <input type="hidden" name='id' value={user.id} />
                                <button className={styles.userButton}>
                                    <RiDeleteBack2Fill />
                                </button>
                            </form>
                    }

                </div>

            ))
            }
        </div >
    )
}

export default AdminUser