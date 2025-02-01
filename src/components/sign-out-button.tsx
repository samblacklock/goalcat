"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign out
    </Button>
  );
}
