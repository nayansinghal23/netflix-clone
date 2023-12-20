import Input from "@/components/Input";
import React, { useCallback, useState } from "react";

const auth = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<string>("login");

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    );
  }, []);

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
          <button className="w-full text-white mt-8 bg-red-700 h-10 rounded-md font-semibold">
            {variant === "login" ? "Log In" : "Sing Up"}
          </button>
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
