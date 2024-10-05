import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import UserAvatar from "./UserAvatar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { bigint } from "zod";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import { getUserDataSelect } from "@/lib/types";

export default function TrendsSidebar(){
  return (
    <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin"/>}>
      <WhoToFollow/>
      <TrendingTopics/>
      </Suspense>
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
      },
      followers:{
        none:{
          followerId: user.id,
        }
      }
    },
    select:getUserDataSelect(user.id),
    take:5
   })


   return <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
    <h1 className="text-lg font-semibold">Who to follow</h1>
      {usersToFollow.map((user)=>(
        
        <div key={user.id} className="flex items-center gap-3">
          <Link href={`/${user.username}`} className="flex items-center gap-3">
          
          <UserAvatar avatarUrl={user.avatarUrl}/>
        <div>
        <p className="line-clamp-1 break-all hover:underline font-semibold">
          {user.displayName}
        </p>
        <p className="text-muted-foreground text-sm line-clamp-1 break-all">
          {user.username}
        </p>
      </div>
      </Link>
      <FollowButton userId={user.id} initialState={{
        followers:user._count.followers,
        isFollowedByUser: user.followers.some(
          ({followerId})=> followerId=== user.id,
        )
      }}
      />
      </div>
      ))}
    </div>
   
}

const getTrendingTopics= unstable_cache(
  async ()=>{
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;
        return result.map((row) => ({
          hashtag: row.hashtag,
          count: Number(row.count),
        }));
  },
  ["trending_topics"],
{
  revalidate: 3*60*60
},
);


async function TrendingTopics(){
  const trendingTopics= await getTrendingTopics();

  return (<div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
  <div className="text-xl font-bold">Trending topics</div>
  {trendingTopics.map(({ hashtag, count }) => {
    const title = hashtag.split("#")[1];

    return (
      <Link key={title} href={`/hashtag/${title}`} className="block">
        <p
          className="line-clamp-1 break-all font-semibold hover:underline"
          title={hashtag}
        >
          {hashtag}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatNumber(count)} {count === 1 ? "post" : "posts"}
        </p>
      </Link>
    );
  })}
</div>
  )

  
}
