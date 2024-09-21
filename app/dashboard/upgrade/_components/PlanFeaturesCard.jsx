import React from 'react'

const PlanFeaturesCard = ({ feature }) => {
    return (
        <p className="flex items-center text-gray-400 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                >
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>
            {feature}
        </p>
    )
}

export default PlanFeaturesCard