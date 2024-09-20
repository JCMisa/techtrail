'use client'

import { UserAnswerContext } from '@/app/_context/UserAnswerContext';
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'

//TODO: Store user answers in a context and compare them to correct answers to gain points, and proceed to next section only if all questions are answered
const QuestionCard = ({ question, index }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);

    const markAsSelected = (option, index) => {
        setIsSelected(prev => !prev);
        setSelectedOptionIndex(index);

        setUserAnswer(prev => ({
            ...prev,
            answer: option
        }))
    }

    const checkAnswer = () => {
        if (userAnswer?.answer == question?.answer) {
            console.log('Correct Answer!');
        } else {
            console.log('Wrong Answer!');
        }
    }

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
                            <Button key={index} variant='outline' className={`${(isSelected && index === selectedOptionIndex) && 'bg-primary border-primary'}`} onClick={() => {
                                markAsSelected(option, index);
                            }}>
                                {option}
                            </Button>
                        ))
                    }
                </div>
            </div>

            {/* check answer */}
            <div className='mt-3'>
                <Button onClick={() => checkAnswer()}>Check Answer</Button>
            </div>
        </div>
    )
}

export default QuestionCard