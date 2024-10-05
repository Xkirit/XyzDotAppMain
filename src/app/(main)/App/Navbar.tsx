import Link from "next/link"
import UserButton from "@/components/ui/UserButton"
import { Input } from "@/components/ui/input"
import localFont from "next/font/local";
import logo from "@/app/(main)/App/logo.png"
import Image from "next/image";

const Navbar = () => {

  

  
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <nav className="flex justify-center items-center max-w-4xl mx-auto py-6 px-4 gap-5">
        <div className="flex">
      <Link href="/App">
      <Image
          src={logo}
          alt="logo"
          className="h-[40px] w-[180px] "
        />
        </Link>
        </div>
        <div className="flex">
          <Input className="w-max" placeholder="Search"/>
        </div>
        <UserButton/>
      </nav>
    </header>
  )
}

export default Navbar
