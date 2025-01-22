import React from 'react'

const PostSkeleton = () => {
  return (
   
    <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
    <div className="flex flex-col gap-6">
      <div className="skeleton h-40 w-full"></div>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="skeleton h-6 w-40"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-3/4"></div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default PostSkeleton