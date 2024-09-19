import React from 'react'

const ViewCourse = ({ params }) => {
    return (
        <div class="relative">
            <img src="your-image.jpg" alt="Image" class="absolute w-full h-full object-cover" />
            <div class="absolute w-full h-full bg-white opacity-0 transition-opacity duration-500">
            </div>
        </div>
    )
}

export default ViewCourse