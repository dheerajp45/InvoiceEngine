import { Suspense } from "react";
import { AuthPageLoading } from "@/app/components/auth/AuthPageShell";
import PasswordResetForm from "./PasswordResetForm";

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<AuthPageLoading />}>
      <PasswordResetForm />
    </Suspense>
  );
}