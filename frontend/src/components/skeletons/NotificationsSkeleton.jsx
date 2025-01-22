import React from 'react'

const NotificationsSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 skeleton rounded-full"></div>
            <div className="flex flex-col gap-2">
                <div className="w-32 h-4 skeleton rounded"></div>
                <div className="w-40 h-4 skeleton rounded"></div>
            </div>
        </div>
    </div>
  )
}

export default NotificationsSkeleton