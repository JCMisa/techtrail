import { Timer } from 'lucide-react'
import React from 'react'
// import YouTube from 'react-youtube'
import CourseContent from './CourseContent';
import YoutubeIframe from './YoutubeIFrame';
import QuestionCard from './QuestionCard';

const CourseComponent = ({ chapter }) => {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-bold overflow-hidden'>{chapter?.chapterName}</h2>
            <p className='text-gray-500 text-sm'>{chapter?.about}</p>
            <div className='text-primary flex flex-row items-center gap-2'>
                <Timer className='w-5 h-5' />
                <p className='text-sm'>{chapter?.duration}</p>
            </div>

            {/* video */}
            <div className='flex justify-center my-6 bg-red-500'>
                <YoutubeIframe videoId={chapter?.chapterVideo} videoTitle={chapter?.chapterName} />
            </div>

            {/* content */}
            {
                chapter?.content?.map((content, index) => (
                    <div key={index} className='flex flex-col gap-3 w-full'>
                        <CourseContent content={content} />
                    </div>
                ))
            }

            {/* questions */}
            <div className='my-10'>
                <div>
                    <h2 className='text-lg sm:text-3xl font-bold'>Test your knowledge</h2>
                    <p className='text-xs sm:text-sm text-gray-500'>Apply what you've learned about {chapter?.chapterName}</p>
                    <div className='my-5 flex flex-col gap-5'>
                        {
                            chapter?.questions.map((question, index) => (
                                <div key={index}>
                                    <QuestionCard question={question} index={index} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseComponent