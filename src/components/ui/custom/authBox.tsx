/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-20T10:00:13-03:00
 */

"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export default function AuthBox() {
  return (<div className="flex items-center space-x-4">
    <AuthBox_/>
  </div>)
}


export function AuthBox_() {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = <div className="flex items-center space-x-2">
    <Avatar>
      <AvatarImage src={session?.data?.user?.image || undefined} alt={session?.data?.user?.name + "'s avatar"} />      
      <AvatarFallback>
        {session?.data?.user?.name?.charAt(0).toUpperCase() || "J"}
      </AvatarFallback>      
    </Avatar>
    <div>
      {/*<span className="font-medium">{session?.data?.user?.name}</span>*/}
      <Button onClick={() => signOut()} className="ml-2">
        Sign out
      </Button>
    </div>
  </div>
  } else {
   authContent = <>
      <Button onClick={() => signIn()}>
      Sign in
    </Button>
    </>
  }
  return authContent;
}
