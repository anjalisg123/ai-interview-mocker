"use client"
import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModals'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


function RecordAnswerSection({mockInterviewQuestions, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const {user}=useUser();
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    const combinedTranscripts = results.map(result => result.transcript).join(' ');
    setUserAnswer(combinedTranscripts);
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length > 10){
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]); // Added isRecording to dependency array for safety

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async() => {
    console.log(userAnswer)
    setLoading(true);
    
    // FIX 1: Handle Capitalization for the Prompt as well
    const currentQuestion = mockInterviewQuestions[activeQuestionIndex]?.question || mockInterviewQuestions[activeQuestionIndex]?.Question;
    const correctAnswer = mockInterviewQuestions[activeQuestionIndex]?.answer || mockInterviewQuestions[activeQuestionIndex]?.Answer;

    const feedbackPrompt = "Question:" + currentQuestion +
    ", User Answer:" + userAnswer + ",Depends on question and user answer for given interview question" +
    " please give us rating for answer and feedback as area of improvement if any " +
    "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    try {
      const result = await chatSession(feedbackPrompt);
      const mockJsonResp = result.replace(/```json/g, '').replace(/```/g, '').trim();
      
      console.log("Success:", mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // FIX 2: Handle Capitalization for Database Insert
      const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: currentQuestion, // Now safely using the variable we defined above
        correctAns: correctAnswer, // Now safely using the variable we defined above
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      })

      if(resp) {
        toast('Answer recorded successfully!');
        setUserAnswer('');
        setResults([]);
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast('Failed to save answer');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 w-full'>
            <div className='absolute flex flex-col items-center justify-center h-[300px] w-full'>
                <WebcamIcon className='h-32 w-32 text-gray-400 absolute' />
            </div>
            <Webcam
                mirrored={true}
                style={{
                    height: 300,
                    width: '100%',
                    zIndex: 10,
                }}
            />
        </div>

        <Button 
          variant='outline' 
          className='my-10'
          onClick={StartStopRecording}
          disabled={loading}
        >
          {isRecording ? (
            <h2 className='text-red-600 flex gap-2'>
              <Mic/> Stop Recording
            </h2>
          ) : (
            'Record Answer'
          )}
        </Button>
    </div>
  )
}

export default RecordAnswerSection