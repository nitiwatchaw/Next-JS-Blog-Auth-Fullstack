
import AddpostForm from "@/components/addPostForm/addPostForm"
import { auth } from '@/lib/auth'

export const generateMetadata = async () => {


    return {
        title: "Add Post",
        description: "Add Post"
    }
}

const AddPostPage = async () => {

    const session = await auth()


    return (
        <>
            <AddpostForm userId={session?.user?.id} username={session?.user?.username} />
        </>
    )
}

export default AddPostPage