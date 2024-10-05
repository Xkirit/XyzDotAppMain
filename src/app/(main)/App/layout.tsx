import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";
import { ThemeProvider } from "next-themes";
import Pixelify_Sans from "next/font/google";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  
  if (!session) redirect("/login");

  return (
    <ThemeProvider>
    <SessionProvider value={session}>
      <div className="flex sticky min-h-screen flex-col">
        <Navbar />
        <div className="max-w-7xl p-5 mx-auto flex w-full grow gap-5">
          <MenuBar className="sticky top-20 h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
          {children}
        </div>
        <MenuBar className=" sticky bottom-0 p-3 gap-3 flex bg-card sm:hidden w-full justify-center flex-row align-baseline rounded-sm border-t" />
      </div>
    </SessionProvider>
  </ThemeProvider>
  );
}

