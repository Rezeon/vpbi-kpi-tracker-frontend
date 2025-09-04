import { SignIn } from "@clerk/clerk-react";

export function SignedInUser () {
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <SignIn />
        </div>
    )
}