import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import { validateRequest } from '@/auth';
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";
import MessagesButton from "./MessagesButton";
import { UnreadMessagesNotification } from "stream-chat-react";

interface MenuBarProps {
  className?: string;
}


export default async function MenuBar({ className }: MenuBarProps) {

  const { user } = await validateRequest();

  if (!user) return null;

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

  return (
  <div className={className}>
  <Button variant="ghost"  className="flex items-center justify-start gap-3" title="Home" asChild>
    <Link href="/App">
      <Home/>
      <span className="hidden lg:inline"> Home</span>
    </Link>
  </Button>
  <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
  {/* <Button variant="ghost"  className="flex items-center justify-start gap-3" title="Notification" asChild>
    <Link href="/App/notifications">
      <Bell/>
      <span className="hidden lg:inline"> Notifications</span>
    </Link>
  </Button> */}
  {/* <Button variant="ghost"  className="flex items-center justify-start gap-3" title="Messages" asChild>
    <Link href="/App/Messages">
      <Mail/>
      <span className="hidden lg:inline"> Messages</span>
    </Link>
  </Button> */}
  <MessagesButton initialState={{ unreadCount: 0}} />
  <Button variant="ghost"  className="flex items-center justify-start gap-3" title="Bookmarks" asChild>
    <Link href="/App/bookmarks">
      <Bookmark/>
      <span className="hidden lg:inline"> Bookmarks</span>
    </Link>
  </Button>

  </div>
  )
  
}