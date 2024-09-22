import Image from 'next/image'
import React from 'react'

const CongratulatoryMessage = () => {
    return (
        <div className="text-gray-400 bg-dark body-font">
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    <div className="rounded-lg h-64 overflow-hidden flex items-center justify-center">
                        <Image alt="content" className="object-cover object-center h-52 w-52" src="/success.gif" width={1000} height={1000} />
                    </div>
                    <div className="flex flex-col sm:flex-row mt-5">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-dark-200 text-primary">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-white text-lg">John Carlo S. Misa</h2>
                                <div className="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
                                <p className="text-base text-gray-400 italic">“Life is not about finding yourself. Life is about creating yourself.”</p>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-primary sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <p className="leading-relaxed text-lg mb-4">Remember, every journey starts with a single step. Keep your mind open, your spirit eager, and your heart filled with the desire to learn. Embrace challenges as opportunities for growth, and never stop believing in your potential. The world is yours to explore and conquer!</p>
                            <a className="text-primary inline-flex items-center">~&nbsp;<span className='italic text-xs'>John Carlo Misa</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CongratulatoryMessage