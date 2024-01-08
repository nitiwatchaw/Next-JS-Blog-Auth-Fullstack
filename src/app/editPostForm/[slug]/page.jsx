import React from 'react'
import { getPost } from '@/lib/data'
import EditPostForm from '@/components/editPostForm/editPostForm'

export const generateMetadata = async ({ params }) => {
    const { slug } = params;

    const post = await getPost(slug);

    return {
        title: post?.title,
        description: post?.desc
    }
}


const EditPostFromSinglePage = async ({ params }) => {


    const { slug } = params;
    const post = await getPost(slug);

    return (
        <>
            <EditPostForm
                postUser={post.userId}
                postId={post?.id}
                postTitle={post?.title}
                postSlug={post?.slug}
                postImg={post?.img}
                postDesc={post?.desc} />
        </>
    )
}

export default EditPostFromSinglePage