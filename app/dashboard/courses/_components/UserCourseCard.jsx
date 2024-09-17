import { Dot } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const UserCourseCard = ({ course }) => {
    return (
        <div>
            <div className="card-c w-full sm:w-[230px]">
                <div className="top-section-c relative">
                    <div className="border-c"></div>
                    <div className="icons-c">
                        <div className="logo-c">
                            <Image src={'/techtrail-logo.png'} width={100} height={100} alt={'logo'} />
                        </div>
                        <div className="social-media-c">
                            <Dot className='svg-c' />
                            <Dot className='svg-c' />
                            <Dot className='svg-c' />
                        </div>
                    </div>
                    <div className='w-[70%] h-20 absolute top-12 left-8 hidden sm:block'>
                        <Image src={course?.courseBanner} width={100} height={100} alt='banner' className='w-full h-full bg-cover rounded-lg' />
                    </div>
                </div>
                <div className="bottom-section-c">
                    <span className="title-c">{course?.courseOutput?.course?.name?.slice(0, 15)}...</span>
                    <div className="row-c row1-c">
                        <div className="item-c">
                            <span className="big-text-c">{course?.courseOutput?.level}</span>
                            <span className="regular-text-c">Level</span>
                        </div>
                        <div className="item-c">
                            <span className="big-text-c">{course?.courseOutput?.duration}</span>
                            <span className="regular-text-c">Duration</span>
                        </div>
                        <div className="item-c">
                            <span className="big-text-c">{course?.courseOutput?.chapters}</span>
                            <span className="regular-text-c">Chapters</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCourseCard