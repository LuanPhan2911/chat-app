"use client";

import { SessionProvider } from "next-auth/react";
import { FunctionComponent } from "react";

interface AuthContextProps {
    children: React.ReactNode
}
 
const AuthContext: FunctionComponent<AuthContextProps> = (
    {
        children
    }
) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
      );
}
 
export default AuthContext;