import { PostData } from "@/lib/types"
import Link from "next/link"
import UserAvatar from "@/components/ui/UserAvatar"
import { formatDistanceToNow } from "date-fns"


interface PostProps{
  post:PostData;
}

export default function Post({post}:PostProps){
  return(
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.username}`}><UserAvatar avatarUrl={post.user.avatarUrl} /></Link>
        <div>
          <Link href={`/users/${post.user.username}`} className="font-medium text-[17px]">{post.user.displayName}</Link>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(post.createdAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        

      </div>
      <div className="whitespace-pre-line break-words ">
      {post.content}
      </div>
      
    </article>
  )
}