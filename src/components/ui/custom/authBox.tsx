/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-19T12:29:14-03:00
 */


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
//        <AvatarImage src="/api/placeholder/32/32" alt="User" />
