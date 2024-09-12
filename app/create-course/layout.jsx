import React from 'react'
import Header from '../_components/Header'

const CreateCourseLayout = ({ children }) => {

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default CreateCourseLayout