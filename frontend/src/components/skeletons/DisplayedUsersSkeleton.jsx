import React from 'react'

const DisplayedUsersSkeleton = () => {
  return (
 
            <div className="col-span-1 lg:col-span-1 hidden lg:block">
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="skeleton h-10 w-10 rounded-full"></div>
                    <div className="skeleton h-6 w-32"></div>
                  </div>
                ))}
                <div className="skeleton h-10 w-full rounded"></div>
              </div>
            </div>
  )
}

export default DisplayedUsersSkeleton