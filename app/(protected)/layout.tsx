import Link from "next/link";
import React from "react";

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/settings" className="font-semibold text-primary">
              Personal Information
            </Link>
            <Link href="/settings">Account Information</Link>
            <Link href="/settings">Other</Link>
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;
