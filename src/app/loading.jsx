'use client'

import PuffLoader from "react-spinners/PuffLoader";
const Loading = () => {
  return (
    <>
      <PuffLoader
        color="#ba9ffb"
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='loader'
      />
    </>
  )
}

export default Loading