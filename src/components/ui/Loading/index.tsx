import React from 'react'

interface LoadingProps {
size:number
}

export const Loading: React.FC<LoadingProps> = ({size}) => {

return (
  <div className="flex-center w-20 h-6">
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin">
      <div className="h-full w-full border-4 border-t-white
       border-b-white rounded-[50%]">
      </div>
    </div>
  </div>
);
}