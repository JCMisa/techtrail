import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AddCourseButton = () => {
    return (
        <div>
            <Link href={'/create-course'}><Button className='hidden sm:block'>+ Create Course</Button></Link>
            <Link href={'/create-course'}><Button className='block sm:hidden text-center rounded-full'>+</Button></Link>
        </div>
    )
}

export default AddCourseButton