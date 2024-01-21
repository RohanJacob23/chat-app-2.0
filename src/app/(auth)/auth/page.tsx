import AuthenticationForm from "@/components/sections/AuthenticationForm";
import React from "react";

export default function page() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen w-full max-w-sm mx-auto p-2">
      <AuthenticationForm />
    </section>
  );
}
