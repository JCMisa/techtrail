import { UserInputContext } from '@/app/_context/UserInputContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import React, { useContext } from 'react'

const CourseTopic = () => {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (name, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            <h2 className='text-center text-3xl my-5'>Enter Course Topic</h2>
            <div className='mx-20 lg:mx-44'>
                {/* input topic */}
                <div className='mt-5'>
                    <label>
                        Write topic for the course you want to create
                    </label>
                    <Input placeholder={'e.g. Python'} onChange={(e) => handleInputChange('topic', e.target.value)} defaultValue={userCourseInput?.topic} />
                </div>

                {/* textarea for desc */}
                <div className='mt-5'>
                    <label>
                        Tell us more about your course (optional)
                    </label>
                    <Textarea placeholder={'About your course'} onChange={(e) => handleInputChange('description', e.target.value)} defaultValue={userCourseInput?.description} />
                </div>

                <Link href={'#course-level'}><Button className='mt-4 min-w-40 max-w-40 float-end' disabled={userCourseInput?.topic == null}>Next</Button></Link>
            </div>
        </div>
    )
}

export default CourseTopic