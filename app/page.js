"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const path = usePathname();

  return (
    <div className="bg-white">
      {/* HEADER / NAVBAR */}
      <header className="flex items-center justify-between p-4 shadow-sm bg-secondary">
        
        {/* LEFT: Logo */}
        <Link href={"/"}>
            <Image src={'/logo.svg'} width={160} height={100} alt="logo" className="cursor-pointer" />
        </Link>
        
        {/* CENTER: Navigation Menu */}
        <ul className="hidden md:flex gap-6 items-center">
            <Link href={"/"}>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/' && 'text-primary font-bold'}
                `}>
                    Home
                </li>
            </Link>

            <Link href={"/dashboard"}>
                <li className="hover:text-primary hover:font-bold transition-all cursor-pointer text-gray-600">
                    Dashboard
                </li>
            </Link>

            
            <Link href={"/dashboard/upgrade"}>
                <li className="hover:text-primary hover:font-bold transition-all cursor-pointer text-gray-600">
                    Upgrade
                </li>
            </Link>
            
            <Link href={"/dashboard/howitworks"}>
                <li className="hover:text-primary hover:font-bold transition-all cursor-pointer text-gray-600">
                    How it works
                </li>
            </Link>
        </ul>

        {/* RIGHT: User Button Only */}
        <div className="flex gap-4 items-center">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button size="sm">Get Started</Button>
            </Link>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="bg-secondary px-4 py-1 rounded-full text-primary font-medium text-sm">
            Top Rated AI Interview Coach
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 text-gray-900 leading-tight">
            Your Personal <span className="text-primary">AI Interview Coach</span>
          </h1>
          <p className="text-xl text-gray-500 mt-6 mb-10">
            Double your chances of landing that job offer with our AI-powered interview prep.
            Practice customized questions, get instant feedback, and improve your confidence.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
              <Button className="px-8 py-6 text-lg">Start Interview</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border hover:border-primary transition-all cursor-pointer">
                  <AtomIcon className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-xl font-bold mb-2">Write Prompt for your form</h3>
                  <p className="text-gray-500">
                    Paste the job description and your years of experience to generate relevant questions.
                  </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border hover:border-primary transition-all cursor-pointer">
                  <Edit className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-xl font-bold mb-2">Edit Your Form</h3>
                  <p className="text-gray-500">
                    Our AI generates 5 highly relevant interview questions tailored to the specific role.
                  </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border hover:border-primary transition-all cursor-pointer">
                  <Share2 className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-xl font-bold mb-2">Practice & Feedback</h3>
                  <p className="text-gray-500">
                    Answer via webcam and get instant rating, feedback, and correct answers.
                  </p>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary py-10 text-center">
         <p className="text-gray-600">© 2026 AI Interview Mocker. All rights reserved.</p>
      </footer>
    </div>
  );
}