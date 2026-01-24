"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import { useContext, useRef } from "react";
import { TodoContext } from "@/context/todoContext";

export default function AuthPage() {
  const {handleRegister, handleLogin} = useContext(TodoContext);
  const registerEmail = useRef<HTMLInputElement>(null);
  const registerName = useRef<HTMLInputElement>(null);
  const registerPassword = useRef<HTMLInputElement>(null);
  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);

  const register = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const name = registerName.current?.value || "";
    const email = registerEmail.current?.value || "";
    const password = registerPassword.current?.value || "";
    if (!name || !email || !password) return;
    handleRegister({ name, email, password });
  };

  const login = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const email = loginEmail.current?.value || "";
    const password = loginPassword.current?.value || "";
    if (!email || !password) return;
    handleLogin({ email, password });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div
        className={cn(
          "relative flex h-[90%] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-[1px]",
          "shadow-[inset_0px_0px_10px_theme(colors.neutral.400),0px_0px_50px_theme(colors.cyan.300)]"
        )}
      >
        {/* Left Section: Signup */}
        <div className="flex w-1/2 flex-col items-center justify-center border-r border-white/10 p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-sm flex-col gap-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cyan-600 text-shadow-md">Create Account</h2>
              <p className="mt-2 text-neutral-400">Join us to start organizing your tasks</p>
            </div>

            <form onSubmit={register} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-300">Full Name</label>
                <input
                  ref={registerName}
                  type="text"
                  placeholder="John Doe"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cyan-500 placeholder-neutral-500 outline-none transition-colors focus:border-cyan-500/50 backdrop-blur-[1px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-300">Email Address</label>
                <input
                  ref={registerEmail}
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cyan-500 placeholder-neutral-500 outline-none transition-colors focus:border-cyan-500/50 backdrop-blur-[1px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <input
                  ref={registerPassword}
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cyan-500 placeholder-neutral-500 outline-none transition-colors focus:border-cyan-500/50 backdrop-blur-[1px]"
                />
              </div>

              <Button type="submit" className="mt-2 w-full justify-center bg-cyan-500/10 hover:bg-cyan-500/20">
                Sign Up
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Right Section: Login */}
        <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-black/20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex w-full max-w-sm flex-col gap-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-teal-600 text-shadow-md">Welcome Back</h2>
              <p className="mt-2 text-neutral-400">Sign in to continue your progress</p>
            </div>

            <form onSubmit={login} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-300">Email Address</label>
                <input
                  ref={loginEmail}
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-teal-500 placeholder-neutral-500 outline-none backdrop-blur-[1px] transition-colors focus:border-teal-500/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <input
                  ref={loginPassword}
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-teal-500 placeholder-neutral-500 outline-none backdrop-blur-[1px] transition-colors focus:border-teal-500/50"
                />
              </div>

              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" variant="secondary" className="mt-2 w-full justify-center bg-teal-500/10 border-teal-500/50 text-teal-400 hover:bg-teal-500/20">
                Log In
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
