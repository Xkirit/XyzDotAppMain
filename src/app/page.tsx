import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Ripple from "@/components/ui/ripple"

export default function Page() {
  return (
    <div className="justify-center items-center text-center h-screen w-full flex bg-gray-950 relative">
      {/* Centering the button and ripple together */}
      <div className="relative z-50">
        <Link href="/App">
          <Button className="bg-purple-700 items-center justify-center flex">
            EnterApp
          </Button>
        </Link>
      </div>
      {/* Ripple component in absolute positioning */}
      <Ripple className="absolute inset-0" />
    </div>
  )
}
