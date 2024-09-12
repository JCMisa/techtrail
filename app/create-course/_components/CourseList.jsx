import React from 'react'
import { courses } from '@/data'
import CourseCard from './CourseCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const CourseList = () => {

    return (
        <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-1">
                {courses.map((course, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <CourseCard course={course} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CourseList