"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "../../../lib/auth-client"

export default function Header(){
const router = useRouter();
const {data: session}= authClient.useSession()

async function handleSignOut(){
    await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin"); // redirect to login page
          },
        },
      });
}

return(<>
    
    {/* links */}
    {session ? (
      <button onClick={handleSignOut}>Logout</button>
    ) : (
      <>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
      </>
    )}
  </>
)
}