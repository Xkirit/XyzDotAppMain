

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Ripple from "@/components/ui/ripple"


export default function Page(){

  return(
    <div className="justify center  items-center text-center h-screen w-full flex bg-gray-950">
      <div className="text-white font-mono text-center justify-center items-center flex-col gap-10 w-screen z-50">
        {/* <h2 className="text-center items-center justify-center flex" > Under Construction...</h2> */}
        <div className="text-center items-center justify-center flex z-50">
        <Link href="/App" > <Button className="bg-purple-700 items-center justify-center flex z-50">EnterApp</Button> </Link>
        </div>
        
      </div>
      <Ripple/>
    </div>
  )
}