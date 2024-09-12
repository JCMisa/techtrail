import React from 'react'
import CreateCourseHeader from './_components/CreateCourseHeader'

const CreateCourseLayout = ({ children }) => {

    return (
        <div>
            <CreateCourseHeader />
            {children}
        </div>
    )
}

export default CreateCourseLayout