"use client";
import EmptyState from "@/app/components/EmptyState";
import { signOut } from "next-auth/react";
import { FunctionComponent } from "react";

interface UserProps {
    
}
 
const User: FunctionComponent<UserProps> = () => {
    return ( 
        <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState/>
        </div>
     );
}
 
export default User;