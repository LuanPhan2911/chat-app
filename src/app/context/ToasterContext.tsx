"use client";
import { FunctionComponent } from "react";

import { Toaster } from "react-hot-toast";
interface ToasterContextProps {
    
}
 
const ToasterContext: FunctionComponent<ToasterContextProps> = () => {
    return ( 
        <Toaster/>
     );
}
 
export default ToasterContext;