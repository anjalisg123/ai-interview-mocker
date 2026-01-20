import React from 'react'
import { AtomIcon, Camera, FileText, Sparkles } from 'lucide-react'

function HowItWorks() {
  return (
    <div className='p-10'>
      
      {/* Page Title */}
      <h2 className='font-bold text-3xl text-center mb-2'>How it Works?</h2>
      <h2 className='text-gray-500 text-center mb-10'>Get your AI Mock Interview in just 3 simple steps</h2>

      {/* Steps Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto'>
        
        {/* Step 1 */}
        <div className='p-6 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center'>
            <div className='p-4 bg-primary/10 rounded-full mb-4'>
                <AtomIcon className='h-10 w-10 text-primary' />
            </div>
            <h2 className='font-bold text-xl'>1. Add New Interview</h2>
            <p className='text-gray-500 mt-2 text-sm'>
                Click on "Add New" and enter your Job Role, Tech Stack (e.g., React, Python), and Years of Experience to generate customized questions.
            </p>
        </div>

        {/* Step 2 */}
        <div className='p-6 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center'>
            <div className='p-4 bg-primary/10 rounded-full mb-4'>
                <Camera className='h-10 w-10 text-primary' />
            </div>
            <h2 className='font-bold text-xl'>2. Answer Questions</h2>
            <p className='text-gray-500 mt-2 text-sm'>
                Enable your webcam and microphone. The AI will ask you 5 professional questions. Answer them verbally just like a real interview.
            </p>
        </div>

        {/* Step 3 */}
        <div className='p-6 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center'>
            <div className='p-4 bg-primary/10 rounded-full mb-4'>
                <Sparkles className='h-10 w-10 text-primary' />
            </div>
            <h2 className='font-bold text-xl'>3. Get Feedback</h2>
            <p className='text-gray-500 mt-2 text-sm'>
                Instantly receive a detailed report with a 1-10 rating, correct answers, and AI-generated feedback on how to improve your response.
            </p>
        </div>

      </div>

      {/* Extra Note Section */}
      <div className='mt-16 text-center'>
        <div className='inline-block p-6 bg-secondary/50 rounded-xl max-w-2xl'>
            <h2 className='flex gap-2 items-center justify-center font-bold text-lg mb-2'>
                <FileText className='text-primary'/> Why use AI Mocker?
            </h2>
            <p className='text-gray-600 text-sm'>
                Our AI analyzes your answers based on industry standards, ensuring you are prepared for technical and behavioral questions tailored specifically to your role.
            </p>
        </div>
      </div>

    </div>
  )
}

export default HowItWorks