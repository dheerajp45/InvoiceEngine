
"use client"
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'

import { setAccountpassword } from "@/app/actions/account"
export default function SetPasswordForm(){
    const router = useRouter()
    const [loading ,setLoading] = useState(false);
    const [message,setMessage] = useState<string|null>(null)
    const [error,setError] = useState<string|null>(null)

    function redirectToDashboard(){
        router.push("/dashboard")
    }

    async function onSubmit(e:FormEvent<HTMLFormElement>) {
            e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword")||"")
    const confirmNewPassword = String(formData.get("confirmNewPassword")||"")


    if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        setLoading(false);
        return;
      }
  
      if (newPassword !== confirmNewPassword) {
        setError("New password and confirm password do not match.");
        setLoading(false);
        return;
      }
try {
      await setAccountpassword( newPassword);

} catch (error) {
    setError("Failed to change password.");
    setLoading(false);
    return;
}
      
      setMessage("Password changed successfully.");
    setLoading(false);
    setTimeout(redirectToDashboard,2000)
    }
    return(
        <>
    <form onSubmit={onSubmit} className="space-y-4">
      {message && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
          {error}
        </p>
      )}


      <div>
        <label className="field-label" htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          className="input"
          type="password"
          name="newPassword"
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="confirmNewPassword">
          Confirm new password
        </label>
        <input
          id="confirmNewPassword"
          className="input"
          type="password"
          name="confirmNewPassword"
          required
          minLength={8}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Updating..." : "Set password"}
      </button>
    </form>
        </>
    )
}