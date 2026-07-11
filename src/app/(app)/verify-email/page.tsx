"use client"
import { useState,useEffect } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";


export default   function verifyEmailPage(){

    const [loading,setLoading] =  useState(false)
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
const searchParams =useSearchParams()
const router = useRouter()
const email = searchParams.get("email");
useEffect(() => {
    if (!email) {
        router.replace("/signin");
    }
}, [email, router]);

async function resendVerificationEmail(): Promise<void> {
    if (!email) {
        setError("Email address is missing.");
        return;
    }

    setMessage(null);
    setError(null);
    setLoading(true);

    const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
    });

    if (error) {
        setError(error.message || "Failed to send verification email.");
        setLoading(false);
        return;
    }

    setMessage("Verification email sent.");
    setLoading(false);
}

    return(
        <>
            <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">  
            <div className="card w-full max-w-md"> verfiy your email   </div>
            {error && (
          <p className="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900">
            {error}
          </p>  )}
                 {message && (
                    <p className="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900">
                      {message}
                    </p>  )}
      
                 <button type="button" className="btn-primary w-full" disabled={loading || !email} onClick={resendVerificationEmail}>
          
          {loading ? "Sending..." : " Resend verification email"} </button>
          <Link href="/signin"> go to siginin</Link>
            </div>
            </>
    )
}