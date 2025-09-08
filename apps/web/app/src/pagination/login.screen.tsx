"use client";

import { useState } from "react";
import TextInput, { CheckboxInput } from "../components/input.general";
import { ButtonSubmit, ButtonLink } from "../components/button.general";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ErrorModal } from "../components/modals.general";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "client"
  });

  const router = useRouter();

  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { login, error } = useAuth();

  function handleSubmit() {
    const { username, password } = data;
    
    if ( !username ) return <ErrorModal
      show = {true}
      error="Enter your username"
      onClose={() => {}} 
    />
    if ( !password ) return <ErrorModal
      show = {true}
      error="Enter your password !"
      onClose={() => {}} 
    />

    if (error) return <ErrorModal
      show = {true}
      error={error.message}
      onClose={() => {}} 
    />

    login(username, password, rememberMe)

    if (data.role === "client") router.push('/');
    if (data.role === "admin") router.push('/dashboard');
  }

  return (
    <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <TextInput
        classes="p-4"
        label="Username"
        value={data.username}
        onChange={e => setData({ ...data, username: e.target.value })}
      />
      <TextInput
        classes="p-4"
        label="Password"
        type={isShowPassword ? "text" :"password"}
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />
      <CheckboxInput 
        classes="p-4"
        label="Show Password"
        checked={isShowPassword}
        onChange={e=> setShowPassword(!e.target.value)}
      />
      <CheckboxInput 
        classes="p-4"
        label="Remember me"
        checked={rememberMe}
        onChange={e=> setRememberMe(!e.target.value)}
      />
      <ButtonSubmit classes="p-3">
        Log in
      </ButtonSubmit>
      <div className="flex justify-center items-center">
        Don't have an account?
        <ButtonLink classes="p-2 text-center" onClick={() => <Navigate to={"/signup"} />}>
          Sign Up
        </ButtonLink>
      </div>
    </form>
  );
}