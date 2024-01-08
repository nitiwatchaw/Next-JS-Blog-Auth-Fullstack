import React from 'react'
import styles from './blog.module.css'
import Loading from '../loading'
import { Suspense } from 'react'
import { getPostsPagination } from '@/lib/data'
import Button from '@/components/button/button'
import ButtonMyPost from '@/components/buttonMyPost/buttonMyPost'
import BlogPagination from '@/components/blogPagination/blogPoagination'
import Search from '@/components/search/search'
import NoPost from '@/components/noPost/noPost'

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/blog", { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

export const metadata = {
  title: 'Blog Page',
  description: 'Blog description',
}


const BlockPage = async ({ searchParams }) => {

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 8

  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  const { totalPages, result: posts } = await getPostsPagination({ page, limit, query: search })




  return (
    <div className={styles.blog}>
      <div className={styles.wrapHeader}>
        <h1 className={styles.header}>Blog</h1>
        <div className={styles.wrapBtn}>
          <ButtonMyPost />
          <Button />
        </div>
      </div>
      <Search search={search} />
      <Suspense fallback={<Loading />}>
        {posts.length !== 0 ?
         <BlogPagination
          posts={posts}
          page={page}
          search={search}
          limit={limit}
          totalPages={totalPages}
        /> :
          <div className="">
            <NoPost />

          </div>
        }

      </Suspense>

    </div>
  )
}

export default BlockPage