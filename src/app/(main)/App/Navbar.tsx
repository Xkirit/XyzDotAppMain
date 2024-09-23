import Link from "next/link"
import UserButton from "../../../components/ui/UserButton"
import { Input } from "@/components/ui/input"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <nav className="flex justify-center items-center max-w-4xl mx-auto py-6 px-4 gap-5">
        <Link href="/" className="text-4xl font-bold text-purple-600 mt-0 mb-2.5">
          xyz
        </Link>
        <div className="flex">
          <Input className="w-max" placeholder="Search"/>
        </div>
        <UserButton/>
      </nav>
    </header>
  )
}

export default Navbar
