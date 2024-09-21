'use client'

import { UserAnswerContext } from '@/app/_context/UserAnswerContext';
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderCircle, SquarePen } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/AiModel';
import Image from 'next/image';

const QuestionCard = ({ question, index }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);

    const markAsSelected = (option, index) => {
        setUserAnswer(prev => ({
            ...prev,
            answer: option
        }))

        if (userAnswer?.answer != undefined) {
            console.log('answer context: ', userAnswer)
            setIsSelected(prev => !prev);
            setSelectedOptionIndex(index);
        }
    }

    //TODO: add logged in user in player table in database and update their points based on the answer result
    const checkAnswer = async () => {
        setDisabled(true);
        if (userAnswer?.answer == question?.answer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
            setLoading(true);
            try {
                const PROMPT = `Please generate a complete explanation in string format on why ${userAnswer?.answer} is not the correct answer for the question: ${question?.question}, and why ${question?.answer} is the right one.`;
                const result = await chatSession.sendMessage(PROMPT);
                if (result) {
                    setExplanation(result.response.text());
                }
            } catch (error) {
                toast(
                    <p>Internal error occured while requesting explanations</p>
                )
            } finally {
                setLoading(false);
            }
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
                            <Button key={index} variant='outline' className={`${(isSelected && index === selectedOptionIndex) && 'bg-primary border-primary'}`} onClick={() => markAsSelected(option, index)}>
                                {option}
                            </Button>
                        ))
                    }
                </div>
            </div>

            {/* check answer */}
            <div className='mt-3'>
                <Dialog>
                    <DialogTrigger>
                        {
                            !disabled && (
                                <Button onClick={() => checkAnswer()}>
                                    {
                                        loading ? <LoaderCircle className='animate-spin' /> : "Check Answer"
                                    }
                                </Button>
                            )
                        }
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isCorrect ? <p className='text-green-500'>Correct</p> : <p className='text-red-500'>Wrong</p>}</DialogTitle>
                            <DialogDescription>
                                {isCorrect ? (
                                    <div className='flex flex-col gap-3'>
                                        <p className='font-bold text-sm text-white'>Congratulations! Your Answer is Correct 🎉 <span className='text-green-500'>+1 points</span></p>
                                        <div>
                                            <Image src={'/correct.gif'} width={1000} height={1000} alt='correct' />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-3'>
                                        <p className='font-bold text-sm text-white'>Your Answer is Incorrect 😟 Please Try Again!</p>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-bold text-lg'>Explanation</p>
                                            <div className='bg-dark-200 p-3 rounded-lg'><p className='text-white'>{explanation}</p></div>
                                        </div>
                                    </div>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button>
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default QuestionCard