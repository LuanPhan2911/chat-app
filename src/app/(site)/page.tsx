import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
     <div className="flex min-h-full bg-gray-100 justify-center flex-col px-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image className="mx-auto w-auto" width={48} height={48} alt="Logo" src={"/images/logo.png"}/>
            <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">Sign in to your account</div>
        </div>
        <AuthForm/>
        
     </div>
    );
  }