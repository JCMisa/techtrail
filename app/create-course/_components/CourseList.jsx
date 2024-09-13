import React, { useContext } from 'react'
import { courses } from '@/data'
import CourseCard from './CourseCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { UserInputContext } from '@/app/_context/UserInputContext'


const CourseList = () => {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (courseName) => {
        setUserCourseInput(prev => ({
            ...prev,
            courseName: courseName
        }));
    }

    return (
        <Carousel className="w-full max-w-xl relative shadow-lg">
            <CarouselContent className="-ml-1">
                {courses.map((course, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3" onClick={() => handleCategoryChange(course.name)}>
                        <div className="p-1">
                            <CourseCard course={course} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='absolute bottom-0 left-14'>
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    )
}

export default CourseList