"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react' 
import { chatSession } from '@/utils/GeminiAIModals'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setjobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const {user} = useUser();

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ", Depends on this information please give me 5 Interview question with Answered in Json Format, Give Question and Answered as field in JSON"

    //     try {
    //         const result = await chatSession(InputPrompt);
    //         const MockJsonResp = result.replace('```json', '').replace('```', '');
    //         const parsedJson = JSON.parse(MockJsonResp);
            
    //         console.log("Success:", parsedJson);
            
    //         setJsonResponse(parsedJson);
    //         if(MockJsonResp)
    //         { 
    //             const resp = await db.insert(MockInterview)
    //             .values({
    //                 mockId:uuidv4(),
    //                 jsonMockResp:MockJsonResp,
    //                 jobPosition:jobPosition,
    //                 jobDesc:jobDesc,
    //                 jobExperience:jobExperience,
    //                 createdBy:user?.primaryEmailAddress?.emailAddress,
    //                 createdAt:moment().format('DD-MM-YYYY')
    //             }).returning({
    //                 mockId:MockInterview.mockId});

    //             console.log("Inserted Id:", resp);
    //         }
    //         else{
    //             console.log("No Response");
    //         }


    //         setLoading(false);  // Stop loading explicitly here
    //         setOpenDialog(false); // Close the dialog
    //     } catch (error) {
    //         console.error("Error generating interview:", error);
    //         setLoading(false); // Stop loading on error
    //     }
    // }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ", Depends on this information please give me 5 Interview question with Answered in Json Format, Give Question and Answered as field in JSON"

        try {
            const result = await chatSession(InputPrompt);
            
            // FIX 1: Use Regex to replace ALL occurrences of markdown code blocks
            // The previous .replace only removed the first match.
            const MockJsonResp = result.replace(/```json/g, '').replace(/```/g, '').trim();

            console.log("Debug - Raw AI Response:", MockJsonResp); // Check your console if it fails again

            // FIX 2: Parse the cleaned string
            const parsedJson = JSON.parse(MockJsonResp);
            
            console.log("Success:", parsedJson);
            
            setJsonResponse(parsedJson);

            if(parsedJson) { 
                const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp, // Store the cleaned string
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY')
                }).returning({
                    mockId: MockInterview.mockId
                });

                console.log("Inserted Id:", resp);
                
                // Only close dialog if everything succeeded
                if(resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/'+resp[0]?.mockId);

                }
            }
        } catch (error) {
            console.error("Error generating interview:", error);
            // If JSON parse fails, you will see the error here.
            // Check the 'Debug - Raw AI Response' log to see what the AI actually sent.
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl'>
                    
                    {/* SECTION 1: HEADER (Text Only) */}
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            Add details about your job position/role, Job description and years of experience.
                        </DialogDescription>
                    </DialogHeader>

                    {/* SECTION 2: FORM (Must be outside Header and Description) */}
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className='mt-7 my-3'>
                                <label>Job Role/Job Position</label>
                                <Input placeholder='Ex. Full Stack Developer' required
                                    onChange={(event) => setJobPosition(event.target.value)} />
                            </div>

                            <div className='my-3'>
                                <label>Job Description/ Tech Stack (In short)</label>
                                <Textarea placeholder='Ex. React, Node.js, MongoDB etc' required
                                    onChange={(event) => setJobDesc(event.target.value)} />
                            </div>

                            <div className='my-3'>
                                <label>Years of Experience</label>
                                <Input placeholder='Ex. 5' type='number' max='50' required
                                    onChange={(event) => setjobExperience(event.target.value)} />
                            </div>
                        </div>
                        
                        <div className='flex gap-5 justify-end'>
                            <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type='submit' disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className='animate-spin mr-2' /> 
                                        Generating from AI
                                    </>
                                ) : (
                                    'Start Interview'
                                )} 
                            </Button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview

