import AuthenticationForm from "@/components/sections/AuthenticationForm";
import React from "react";

const DATABASE_URL = process.env.DRIZZLE_DATABASE_URL;

export default async function page() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen w-full max-w-sm mx-auto p-2">
      <AuthenticationForm DATABASE_URL={DATABASE_URL} />
    </section>
  );
}
