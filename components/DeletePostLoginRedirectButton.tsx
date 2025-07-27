"use client";

import { readAndDeletePostLoginRedirect } from "@/actions/cookieAction";
import React from "react";

export function DeletePostLoginRedirectButton() {
  const handleDelete = async () => {
    await readAndDeletePostLoginRedirect();
    // Optionally, you can add logic here to update UI or redirect
    // e.g., window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      Delete Post Login Redirect Cookie
    </button>
  );
}
