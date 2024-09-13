import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowBigUpDash, Brain, Clock, Hash } from 'lucide-react'
import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input';

const CourseOptions = () => {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (name, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='w-full sm:w-[50%]'>
                        <div className='flex flex-row items-center gap-1 my-2'>
                            <ArrowBigUpDash className='w-5 h-5' />
                            <label className='text-sm'>Course Difficulty</label>
                        </div>
                        <Select onValueChange={(value) => handleInputChange('level', value)} defaultValue={userCourseInput?.level}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner" className='cursor-pointer'>Beginner</SelectItem>
                                <SelectItem value="Intermediate" className='cursor-pointer'>Intermediate</SelectItem>
                                <SelectItem value="Advance" className='cursor-pointer'>Advance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='w-full sm:w-[50%]'>
                        <div className='flex flex-row items-center gap-1 my-2'>
                            <Clock className='w-5 h-5' />
                            <label className='text-sm'>Course Duration</label>
                        </div>
                        <Select onValueChange={(value) => handleInputChange('duration', value)} defaultValue={userCourseInput?.duration}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1 Hour" className='cursor-pointer'>1 Hour</SelectItem>
                                <SelectItem value="2 Hours" className='cursor-pointer'>2 Hours</SelectItem>
                                <SelectItem value="2+ Hours" className='cursor-pointer'>2+ Hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <div className='flex flex-row items-center gap-1'>
                        <Hash className='w-5 h-5' />
                        <label className='text-sm my-2'>No. of Chapters</label>
                    </div>
                    <Input type={'number'} onChange={(e) => handleInputChange('chapters', e.target.value)} defaultValue={userCourseInput?.chapters} />
                </div>
            </div>
        </div>
    )
}

export default CourseOptions