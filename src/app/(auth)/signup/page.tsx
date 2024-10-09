import { Metadata } from "next"
import signupImage from "@/assets/signup-image.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata : Metadata ={
  title: "Sign up"
}

const page = () => {
  return (
    
    <main className="flex h-screen items-center justify-center container">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-700">Sign up to xyz</h1>
        <p className="text-muted-foreground">A place where you can find a friend</p>
        </div>
        <div>
          <div className="space-y-5">
            <SignUpForm/>
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Login
            </Link>

          </div>
        </div>
        
        </div>
        
          <Image src={signupImage} alt= "signup" className="w-1/2 hidden md:block object-cover"/>
        
      </div>
      
    </main>
  )
}

export default page
