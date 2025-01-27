import React from 'react'

const NotificationsSkeleton = () => {

  const skeletonNotifications = Array(6).fill(null);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {skeletonNotifications.map((_, idx) => (
      <div key={idx} className='bg-base-100 p-4 rounded-lg flex items-center gap-4'>
        <div className="skeleton h-10 w-10 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-32"></div>
          <div className="skeleton h-3 w-16"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default NotificationsSkeleton