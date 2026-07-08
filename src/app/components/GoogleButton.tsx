import { authClient } from "../../../lib/auth-client";

export default function GoogleButton(){
    return(
        <>
        <div className="my-4 flex items-center gap-3">
  <div className="h-px flex-1 bg-gray-200" />
  <span className="text-xs text-gray-500">or</span>
  <div className="h-px flex-1 bg-gray-200" />
</div>

<button
  type="button"
  className="btn-secondary w-full"
  onClick={() =>
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }
>
  Continue with Google
</button></>
    )
}