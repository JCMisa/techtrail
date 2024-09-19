import { Timer } from 'lucide-react'
import React from 'react'
// import YouTube from 'react-youtube'
import CourseContent from './CourseContent';
import YoutubeIframe from './YoutubeIFrame';

// const opts = {
//     height: '390',
//     playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 0,
//     },
// };

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
                {/* <YouTube
                    videoId={chapter?.chapterVideo}
                    opts={opts}
                    className='w-20 sm:w-auto'
                /> */}
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
        </div>
    )
}

export default CourseComponent