"use client";

import React, { useState } from "react";
import PasswordInput from "./password";
import { auth } from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Giriş yapıldı");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Email veya şifreniz yanlış");
      });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-color">
      <div className="flex flex-col gap-5 w-[350px] shadow-2xl shadow-black px-8 py-18 rounded-2xl">
        <h1 className="text-5xl font-extrabold font-serif mb-5 text-black text-center">
          TAT-AL Yönetici Girişi
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="bg-gradient-to-l from-[#EAE4D5] via-[#B6B09F] text-black outline-none px-4 py-4 rounded-lg font-bold text-md"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //             defaultValue={"tatalrestaurant123@gmail.com"}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-black shadow-2xl shadow-black px-2 py-4 rounded-xl hover:bg-black hover:text-white hover:translate-y-[-7px] duration-400 font-bold font-serif"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
