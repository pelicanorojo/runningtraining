
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
        <AvatarImage src="/api/placeholder/32/32" alt="User" />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}