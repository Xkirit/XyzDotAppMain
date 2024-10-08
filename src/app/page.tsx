

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Page(){

  return(
    <div className="justify center  items-center text-center h-screen w-full flex bg-gray-950">
      <div className="text-white font-mono text-center justify-center items-center flex-col gap-10 w-screen">
        <h2 className="text-center items-center justify-center flex" > Under Construction...</h2>
        <div className="text-center items-center justify-center flex mt-5">
        <Link href="/App" > <Button className="bg-purple-700 items-center justify-center flex">EnterApp</Button> </Link>
        </div>
      </div>
     
    </div>
  )
}