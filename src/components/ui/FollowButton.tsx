"use client"

import { useToast } from "@/hooks/use-toast"
import kyInstance from "@/lib/ky";
import { QueryClient, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { Button } from "./button";
import { FollowerInfo } from "@/lib/types";
interface FollowButtonProps{
  userId: string,
  initialState: FollowerInfo
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps){
  const{toast} = useToast();

  const queryClient= useQueryClient();

  const {data}= useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = ["follower-info", userId]

  const{mutate} = useMutation({
    mutationFn:()=>
      data.isFollowedByUser ? kyInstance.delete(`/api/users/${userId}/followers`)
    : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async ()=>{
      const queryKey: QueryKey = ["follower-info", userId]

      await queryClient.cancelQueries({queryKey})

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey,()=>({
        followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return {previousState};
    },
    onError(error, variables, context){
      queryClient.setQueryData(queryKey, context?.previousState)
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wront, Please try again"
      })
    }
  })

  return (
    <Button variant= {data.isFollowedByUser ? "outline":"secondary"}
    onClick={()=>mutate()} className="">
      {data.isFollowedByUser?"Unfollow":"Follow"}
    </Button>
  )
}

