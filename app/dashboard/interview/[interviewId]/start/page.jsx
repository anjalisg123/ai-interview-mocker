"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { act, use, useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
// import RecordAnswerSection from './_components/RecordAnswerSection';

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), {
  ssr: false // This disables server-side rendering for this component
})

function StartInterview({params}) {

    const unwrappedParams = use(params);
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {

        if (unwrappedParams?.interviewId) {
            GetInterviewDetails();
        }

    },[unwrappedParams.interviewId]);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, unwrappedParams.interviewId))

            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQuestions(jsonMockResp);
            setInterviewData(result[0]);
    }


  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/*Question Section */}
            <QuestionsSection 
            mockInterviewQuestions={mockInterviewQuestions} 
            activeQuestionIndex={activeQuestionIndex}
            
            />

            {/* Video/ Audio Recording */}
            <RecordAnswerSection
                mockInterviewQuestions={mockInterviewQuestions} 
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />
            
        </div>

        <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0&&
             <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
            {activeQuestionIndex!=mockInterviewQuestions?.length-1&&
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
            {activeQuestionIndex===mockInterviewQuestions?.length-1&&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button>End Interview</Button>
            </Link>}
        </div>
    </div>
  )
}

export default StartInterview