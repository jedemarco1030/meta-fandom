"use client";

import React, { useState } from "react";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  return (
    <button
      onClick={onClick}
      className="cursor-pointer"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : children}
    </button>
  );
};
