"use client";
import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon:IconType,
    onClick:()=>void
}
 
const AuthSocialButton: FunctionComponent<AuthSocialButtonProps> = (
    {
        icon:Icon,
        onClick
    }
) => {
    return (  
        <button 
        className="
        inline-flex 
        w-full 
        justify-center 
        rounded-md 
        px-2 
        py-4 
        ring-1 
        text-gray-500 
        shadow-sm
        ring-inset
        ring-gray-300
        hover:bg-gray-300
        focus:outline-offset-0
        "
        onClick={onClick}>
            <Icon/>
        </button>
    );
}
 
export default AuthSocialButton;