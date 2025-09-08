"use client";

import { useState } from "react";

import TextInput from "../components/input.general";
import { ButtonLink, ButtonSubmit } from "../components/button.general";
import { Navigate } from "react-router-dom";
import { ErrorModal } from "../components/modals.general";
import { CheckboxInput } from "../components/input.general";
import SignupRedirect from "../../services/signup.redirect";

export default function SignupScreen() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "client"
  });

  const [error, setError] = useState(null);

  const [isShowPassword, setShowPassword] = useState<boolean>(false);

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
  
      if (error) {
        setError(prev => prev + error);
        return;
      }
  
      SignupRedirect({username, password});
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
        type="password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />
      <CheckboxInput 
        classes="p-4"
        label="Show Password"
        checked={isShowPassword}
        onChange={e=> setShowPassword(!e.target.value)}
      />
      <ButtonSubmit classes="p-3">
        Sign up
      </ButtonSubmit>
      <div className="flex justify-center items-center">
        Already have an account?
        <ButtonLink classes="p-2 text-center" onClick={() => <Navigate to={"/login"} />}>
          Log in
        </ButtonLink>
      </div>
    </form>
  );
}

