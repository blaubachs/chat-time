import React, { useState } from "react";
import { LoginSignupProps, UserObject } from "../utils/interfaces";
import API from "../utils/API";

export default function Signup({ setToken, setUserObject }: LoginSignupProps) {
  const [signupForm, setSignupForm] = useState<UserObject>({
    username: "",
    password: "",
  });

  const handleSignupFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await API.signup(signupForm);
      console.log(newUser);
      setToken(newUser.token);
      setUserObject(newUser.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="m-1 text-black rounded-md"
          name="username"
          autoComplete="off"
          onChange={handleSignupFormChange}
          value={signupForm.username}
        />
        <label htmlFor="password">Password</label>
        <input
          className="m-1 text-black rounded-md"
          name="password"
          type="password"
          autoComplete="off"
          onChange={handleSignupFormChange}
          value={signupForm.password}
        />
        <button className="m-3 p-1 bg-blue-400 rounded-md" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
