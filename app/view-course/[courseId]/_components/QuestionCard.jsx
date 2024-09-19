import { Button } from '@/components/ui/button'
import React from 'react'

//TODO: Store user answers in a context and compare them to correct answers to gain points, and proceed to next section only if all questions are answered
const QuestionCard = ({ question, index }) => {
    return (
        <div className='bg-dark-100 border rounded-sm p-5'>
            <h2 className='font-bold text-xl'>
                Question No.{index + 1}
            </h2>
            <div className='mt-2'>
                <h2 className='text-lg'>{question?.question}</h2>
                <div className='mt-3 flex flex-col gap-3'>
                    {
                        question?.options?.map((option, index) => (
                            <Button variant='outline' onClick={() => console.log(option)}>
                                {option}
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionCard