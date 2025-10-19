"use client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { signUp } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const userSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
  });

  const handleRegister = async () => {
    try {
      const userInfo = userSchema.parse({ email, password, name });
      const result = await signUp(
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      if (!result.user) {
        alert("Registration failed!");
      }
    } catch (e) {
      // validating input
      if (e instanceof z.ZodError && e.issues && e.issues.length > 0) {
        alert(e.issues[0]?.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
    redirect("/panel");
  };

  return (
    <>
      <Navbar />
      <div className={`bg-[#141b2a] h-screen w-full md:pt-24`}>
        <div className="mx-auto md:w-7xl">
          <p className="text-4xl text-center mt-28 text-white">
            Create your account
          </p>
          <p className="text-center text-zinc-400 pt-2 mb-12">
            To start hosting your Minecraft server
          </p>
          <div className="flex justify-center items-center">
            <div className="border border-zinc-700 h-48 w-96 md:h-96 md:w-172 bg-[#1c2536] rounded-2xl drop-shadow-xl flex flex-col justify-between">
              <div className="px-8 pt-8">
                Full Name
                <Input
                  className="border-zinc-500 mt-2 mb-4"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
                E-mail
                <Input
                  className="border-zinc-500 mt-2 mb-4"
                  placeholder="admin@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                Password
                <Input
                  className="border-zinc-500 mt-2"
                  type="password"
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="gap-8 rounded-b-xl h-28 flex items-center justify-center">
                <button
                  onClick={async () => await handleRegister()}
                  className="px-8 py-4 text-xl bg-blue-500 rounded-xl text-md cursor-pointer hover:bg-blue-600 transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
