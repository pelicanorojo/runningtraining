/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-14T09:19:11-03:00
 */

/*
//import React, {useState} from 'react';
import { LogIn, User } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AuthBox() {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm">
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Button>
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
*/
//        <AvatarImage src="/api/placeholder/32/32" alt="User" />
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AuthBox() {
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
      <span className="font-medium">{session?.data?.user?.name}</span>
      <Button onClick={() => signOut()} variant="destructive" className="ml-2">
        Sign out
      </Button>
    </div>
  </div>
  } else {
    console.log('DBG: session', session);

   authContent = <><div className="flex items-center space-x-2 invisible">
      <Avatar>
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <span>Placeholder Name</span>
      <Button>Sign Out</Button>
    </div>
      <Button onClick={() => signIn()}>
      Sign in with Google
    </Button>
    </>
  }
  return authContent;
}
/*
      {!session && (
        <Button onClick={() => signIn()}>
          Sign in with Google
        </Button>
      )}

      {session && (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name + "'s avatar"} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium">{session?.user?.name}</span>
            <Button onClick={() => signOut()} variant="destructive" className="ml-2">
              Sign out
            </Button>
          </div>
        </div>
      )}

      {!session && (
        <div className="flex items-center space-x-2 invisible">
          <Avatar>
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <span>Placeholder Name</span>
          <Button>Sign Out</Button>
        </div>
      )}
*/