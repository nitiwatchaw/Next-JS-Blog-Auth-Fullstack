
import React, { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser'
import { getPost } from '@/lib/data'
import Link from 'next/link'
import { LuArrowLeftFromLine } from "react-icons/lu";
import { auth } from '@/lib/auth'
import ReactionButton from '@/components/reaction/reactionbutton'
import UserLiked from '@/components/userLiked/userLiked'
import { MdDelete } from "react-icons/md";
import { deletePost } from '@/lib/action'
import { notFound } from 'next/navigation'
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);

  return {
    title: post?.title,
    description: post?.desc
  }
}


// const getData = async (slug) => {
//   const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };



const SinglePostPage = async ({ params }) => {

  const { slug } = params;

  const post = await getPost(slug);



  const session = await auth()
  const user = session?.user?.username
  const userId = session.user.id

  const plainPost = JSON.parse(JSON.stringify({
    id: post?.id,
    title: post?.title,
    desc: post?.desc,
    img: post?.img,
    userId: post?.userId,
    slug: post?.slug,
    createdAt: post?.createdAt,
    updatedAt: post?.updatedAt,
    likedBy: post?.likedBy
  }));



  return (
    <>
      {
        post ? <div className={styles.blog}>

          {post?.img ?

            <Image src={post?.img} alt="" fill className={styles.imgBG} sizes='width:100% height:100%' />
            :

            <Image src="/noimg.png" alt="" fill className={styles.imgBG} sizes='width:100% height:100%' />

          }
          <div className={styles.titleContainer}>
            <Link href='/blog' className={styles.link}><LuArrowLeftFromLine /></Link>
            <h1 className={styles.title}>{post?.title}</h1>
          </div>
          <div className={styles.container}>

            <div className={styles.imgContainer}>
              {post?.img ?
                <Image src={post?.img} alt="" fill className={styles.img} sizes='width:100% height:100%' />
                :
                <Image src="/noimg.png" alt="" fill className={styles.img} sizes='width:100% height:100%' />

              }
            </div>
            <div className={styles.textContainer}>

              <div className={styles.detail}>

                {post && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PostUser userId={post.userId} />
                  </Suspense>
                )}
                <div className={styles.detailText}>
                  <span className={styles.detailTitle}>Published</span>
                  <span className={styles.detailValue}>{post?.createdAt.toString().slice(0, 10)}</span>
                </div>
                {
                  session?.user?.id !== post?._doc.userId ?
                    <div className={styles.btnWrap}>
                      <Link title='view user profile' href={`/user/${post.userId}`} className={styles.edit}><FaEye /></Link>
                    </div>
                    : ""
                }
                {
                  session?.user?.id === post?._doc.userId ?
                    <div className={styles.btnWrap}>
                      <Link title='edit post' href={`/editPostForm/${post.slug}`} className={styles.edit}><CiEdit /></Link>
                      <form action={deletePost}>
                        <input type="hidden" placeholder="postId" name='id' value={post?.id} />
                        <button title='delete post' className={styles.del}><MdDelete /></button>
                      </form>
                    </div>
                    : null
                }

              </div>
              <div className={styles.content}>
                <p className={styles.descHeader}>Description</p>
                <p>{post?.desc}</p>
              </div>

              <div className={styles.reaction}>

                <ReactionButton
                  username={user}
                  id={userId}
                  postId={post?.id}
                  post={plainPost}
                />

                <UserLiked
                  username={user}
                  id={userId}
                  postId={post?.id}
                  post={plainPost}
                />
              </div>
            </div>
          </div>
        </div > : notFound()
      }
    </>
  )
}



export default SinglePostPage