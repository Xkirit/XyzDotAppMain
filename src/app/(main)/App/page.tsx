
import Image from "next/image";
import Navbar from "./Navbar"; // Ensure Navbar is a default export
import PostEditor from "@/components/ui/posts/editor/PostEditor"
import prisma from "@/lib/prisma";
import Post from "@/components/ui/posts/Post";
import { getPostDataInclude } from "@/lib/types";
import TrendsSidebar from "@/components/ui/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";
import { validateRequest } from "@/auth";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import { useSession } from "./SessionProvider";
import { redirect } from "next/navigation";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic';
export default async function Home() {
  const{user} = await validateRequest();
  const userId= user?.id;

  const session = await validateRequest();

  if (!session) redirect("/login");
  if(!user) redirect("login");

 
  const posts= await prisma.post.findMany({
    include:getPostDataInclude(userId || ''),
    orderBy:{
      createdAt:"desc"
    }
  })
  

  return (
 
    <div className="flex w-full h-screen min-w-0 gap-5 ">
      <div className="w-full min-w-0 space-y-5">

        <PostEditor/>
      
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed/>
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed/>
          </TabsContent>
        </Tabs>
        
      </div>
      <TrendsSidebar/>
  
    </div>

  )
}
