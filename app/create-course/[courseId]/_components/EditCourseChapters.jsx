import React, { useState, useEffect } from 'react'
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
import { LoaderCircle, SquarePen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { Course } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'

const EditCourseChapters = ({ course, chapterIndex, refreshData }) => {
    const courseOutputChapters = course?.courseOutput?.course?.chapters;

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [duration, setDuration] = useState()

    useEffect(() => {
        course && setName(courseOutputChapters[chapterIndex]?.chapterName);
        course && setAbout(courseOutputChapters[chapterIndex]?.about)
        course && setDuration(courseOutputChapters[chapterIndex]?.duration)
    }, [course])


    const onUpdateHandler = async () => {
        setLoading(true)
        try {
            course.courseOutput.course.chapters[chapterIndex].chapterName = name;
            course.courseOutput.course.chapters[chapterIndex].about = about;
            course.courseOutput.course.chapters[chapterIndex].duration = duration;

            const result = await db.update(Course).set({
                courseOutput: course?.courseOutput
            }).where(eq(Course?.id, course?.id))

            if (result) {
                toast(
                    <p className='text-sm font-bold text-green-500'>Course chapter updated successfully</p>
                )
                refreshData()
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while updating course chapter</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <SquarePen />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Chapter Title</label>
                            <Input defaultValue={courseOutputChapters[chapterIndex].chapterName} onChange={(e) => setName(e.target.value ? e.target.value : courseOutputChapters[chapterIndex]?.chapterName)} />
                        </div>
                        <div className='mt-2'>
                            <label>Course Chapter About</label>
                            <Textarea defaultValue={courseOutputChapters[chapterIndex].about} onChange={(e) => setAbout(e.target.value ? e.target.value : courseOutputChapters[chapterIndex]?.about)} className='card-scroll h-32' />
                        </div>
                        <div className='mt-2'>
                            <label>Course Chapter Duration</label>
                            <Input defaultValue={courseOutputChapters[chapterIndex].duration} onChange={(e) => setDuration(e.target.value ? e.target.value : courseOutputChapters[chapterIndex]?.duration)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={() => onUpdateHandler()}>
                            {
                                loading ? <LoaderCircle className='animate-spin' /> : 'Update'
                            }
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseChapters