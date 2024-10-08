import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <header className="fixed top-0 w-full z-50">
        <Navbar />
        </header>
        <div className="mx-auto mt-[5.25rem] flex w-full max-w-7xl grow gap-5 p-5">
          {/* MenuBar on the left side */}
          <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>

        {/* MenuBar at the bottom for mobile view */}
        <footer className="fixed bottom-0 w-full sm:hidden">
          <MenuBar className="flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
        </footer>
      </div>
    </SessionProvider>
  );
}
