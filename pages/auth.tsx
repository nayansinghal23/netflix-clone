import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";

const auth = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<string>("login");
  const [msg, setMsg] = useState<string>("");

  const toggleVariant = useCallback(() => {
    setMsg("");
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      return;
    }
    signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    })
      .then((res) => {
        console.log(res);
        if (res?.error) {
          setMsg(res?.error);
          return;
        }
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, password]);

  const register = useCallback(
    async (e?: any) => {
      if (!name || !email || !password) {
        return;
      }
      e.preventDefault();
      axios
        .post("/api/register", {
          name,
          email,
          password,
        })
        .then((res) => {
          // console.log(res);
          login();
        })
        .catch((err) => {
          // console.log(err);
          if (err?.response?.status === 422) {
            setMsg("Email present already");
          }
        });
    },
    [name, email, password, router]
  );

  return (
    <div className="bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-screen w-full relative flex  flex-col justify-center items-center gap-5 lg:opacity-70">
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-10 absolute top-8 left-5"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Sign In" : "Register"}
          </h1>
          <div className="flex flex-col gap-3">
            {variant === "register" && (
              <Input
                placeholder="Enter name"
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            )}
            {msg && <p className="text-white">{msg}</p>}
            <Input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={variant === "login" ? login : register}
            className="w-full text-white mt-8 bg-red-700 h-10 rounded-md font-semibold"
          >
            {variant === "login" ? "Log In" : "Sing Up"}
          </button>
        </div>
        <div
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <FaGithub size={30} />
        </div>
        <p className="text-white">
          {variant === "login" ? "Don't have account?" : "Have an account?"}{" "}
          <span
            className="underline hover:cursor-pointer"
            onClick={toggleVariant}
          >
            {variant === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default auth;
