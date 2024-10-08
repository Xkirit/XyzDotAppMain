import Link from "next/link";
import UserButton from "@/components/ui/UserButton";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/app/(main)/App/logo.png";
import SearchField from "@/components/ui/SearchField";

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-card shadow-sm"> {/* Fixed positioning */}
      <nav className="flex justify-center items-center max-w-7xl mx-auto py-[25px] px-5 gap-5">
        <div className="flex">
          <Link href="/App">
            <Image
              src={logo}
              alt="logo"
              className="min-w-[180px] h-[40px] w-[180px]"
            />
          </Link>
        </div>
        <div className="flex-shrink">
          <SearchField/>

        </div>
        <UserButton />
      </nav>
    </header>
  );
};

export default Navbar;
