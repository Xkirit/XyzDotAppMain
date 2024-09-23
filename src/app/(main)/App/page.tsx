
import Image from "next/image";
import Navbar from "./Navbar"; // Ensure Navbar is a default export
import PostEditor from "@/components/ui/posts/editor/PostEditor"
import prisma from "@/lib/prisma";
import Post from "@/components/ui/posts/Post";
import { postDataInclude } from "@/lib/types";
import TrendsSidebar from "@/components/ui/TrendsSidebar";
export default async function Home() {
  const posts= await prisma.post.findMany({
    include:postDataInclude,
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className="flex w-full h-screen min-w-0 gap-5 ">
      <div className="w-full min-w-0 space-y-5">

        <PostEditor/>

        {posts.map(post=>(
          <Post key={post.id} post={post}/>
        ))}
        
      </div>
      <TrendsSidebar/>
  
    </div>
  )
}
