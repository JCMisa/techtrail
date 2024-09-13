'use client'

import React, { useState } from 'react'
import CreateCourseHeader from './_components/CreateCourseHeader'
import { UserInputContext } from '../_context/UserInputContext';

const CreateCourseLayout = ({ children }) => {

    const [userCourseInput, setUserCourseInput] = useState([]);

    return (
        <div>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
                <>
                    <CreateCourseHeader />
                    {children}
                </>
            </UserInputContext.Provider>
        </div>
    )
}

export default CreateCourseLayout