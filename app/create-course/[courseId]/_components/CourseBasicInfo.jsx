import React from 'react'

const CourseBasicInfo = (course) => {
    return (
        <div>
            <div>
                <h2>{course?.courseTitle}</h2>
            </div>
        </div>
    )
}

export default CourseBasicInfo