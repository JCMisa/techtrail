import React from 'react'

const FloatingDesigns = () => {
    return (
        <div>
            <div className='floating-1 absolute top-20 right-10 min-w-80 min-h-80 z-[-10] opacity-75 hidden sm:block'></div>
            <div className='floating-2 absolute top-80 left-10 min-w-40 min-h-40 z-[-10] opacity-75 hidden sm:block animate-pulse'></div>
            <div className='floating-3 absolute top-96 right-10 min-w-10 min-h-10 z-[-10] opacity-75 hidden sm:block'></div>

            <div className='floating-5 absolute top-[35rem] right-80 min-w-10 min-h-10 z-[-10] opacity-75 hidden sm:block animate-bounce'></div>

            <div className='floating-4 absolute bottom-0 left-10 min-w-80 min-h-80 z-[-10] opacity-75 hidden sm:block animate-pulse'></div>
            <div className='floating-1 absolute bottom-60 right-32 min-w-40 min-h-40 z-[-10] opacity-75 hidden sm:block'></div>
            <div className='floating-2 absolute bottom-0 right-10 min-w-10 min-h-10 z-[-10] opacity-75 hidden sm:block animate-bounce'></div>
        </div>
    )
}

export default FloatingDesigns