import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import UserAvatar from "./UserAvatar";

export default function TrendsSidebar(){
  return (
    <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
      <WhoToFollow/>
    </div>
  );
}

async function WhoToFollow(){

   const {user} = await validateRequest();

   if(!user) return null;
   const usersToFollow= await prisma.user.findMany({
    where:{
      NOT:{
        id:user?.id
      }
    },
    select:userDataSelect,
    take:5
   })


   return <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
    <h1 className="text-lg font-semibold">Who to follow</h1>
    <div className="space-y-5">
      {usersToFollow.map((user)=>(
        <div key={user.id} className="flex items-center gap-3">
          <UserAvatar avatarUrl={user.avatarUrl}/>
        </div>
      ))}
    </div>
   </div>
}
