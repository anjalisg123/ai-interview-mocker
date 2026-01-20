import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
  <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      
  {/* LEFT IMAGE SECTION */}
  <div className="relative hidden lg:block">
    <Image
      src="/new_image.avif" // add image in public folder
      alt="Auth background"
      fill
      className="object-cover"
      priority
    />

    <div className="absolute inset-0 bg-black/40" />

    <div className="absolute bottom-10 left-10 text-white max-w-md">
      <h1 className="text-4xl font-bold">
        Welcome to AI Mock Interviews 
      </h1>
      <p className="mt-4 text-white/80">
        Practice AI-powered mock interviews with confidence.
      </p>
    </div>
  </div>

  {/* RIGHT AUTH SECTION */}
  <div className="flex items-center justify-center p-6">
    <SignIn
      appearance={{
        elements: {
          rootBox: "w-full max-w-md",
          card: "shadow-lg rounded-xl",
        },
      }}
    />
  </div>
</div>
)
}