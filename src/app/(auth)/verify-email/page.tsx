import { Suspense } from "react";
import { AuthPageLoading } from "@/app/components/auth/AuthPageShell";
import VerifyEmailForm from "./VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<AuthPageLoading />}>
      <VerifyEmailForm />
    </Suspense>
  );
}