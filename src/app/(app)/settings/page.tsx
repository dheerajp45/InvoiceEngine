import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./components/change-password-form";
import SetPasswordForm from "./components/set-password-form";
import { auth } from "../../../../lib/auth";
export default async function SettingsPage() {

    const session = await auth.api.getSession({
      headers: await headers(),
    })


    if (!session?.user) {
      redirect("/signin");
    }
    const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
    });

    const hasPassword = accounts.some(
      (account) => account.providerId === "credential"
    );
    
  
    return (
      <main>
        <h1>Settings</h1>
    
        {hasPassword ? (
          <div>
            <ChangePasswordForm></ChangePasswordForm>
          </div>
        ) : (
          <div>
           <SetPasswordForm></SetPasswordForm>
          </div>
        )}
      </main>
    );
  }