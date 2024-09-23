"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { submitPost } from "./actions"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import UserAvatar from "@/components/ui/UserAvatar"
import { useSession } from "@/app/(main)/App/SessionProvider";
import { EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/LoadingButton";
import { useTransition } from "react";
import "./styles.css"

export default function PostEditor(){

  const {user} = useSession()
  const [isPending, startTransition]= useTransition();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
    ],
    content: '', // Ensure the editor starts with empty content
  });

  const input = editor?.getText({
    blockSeparator: "\n",
  }) || "";

  async function onSubmit() {
    await submitPost(input)
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline"/>
        <EditorContent 
          editor={editor}
          className="tiptap w-full max-h-[20rem] overflow-y-auto bg-background rounded-xl px-4 py-3"
        />
      </div>
      <div className="flex justify-end gap-2">
        {/* <Button onClick={onSubmit} disabled={!input}>Post</Button> */}
        <LoadingButton loading={isPending} onClick={onSubmit} disabled={!input} >
          Post
        </LoadingButton>
      </div>
    </div>
  )
}




