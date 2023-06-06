import React, { useState } from "react";
import { LoginSignupProps, UserObject } from "../utils/interfaces";
import API from "../utils/API";

export default function Login({ setToken, setUserObject }: LoginSignupProps) {
  const [loginForm, setLoginForm] = useState<UserObject>({
    username: "",
    password: "",
  });

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await API.login(loginForm);
      console.log(newUser);
      setToken(newUser.token);
      setUserObject(newUser.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Login</h1>
      <form className="flex flex-col" onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="m-1 text-black rounded-md"
          name="username"
          autoComplete="off"
          onChange={handleLoginFormChange}
          value={loginForm.username}
        />
        <label htmlFor="password">Password</label>
        <input
          className="m-1 text-black rounded-md"
          name="password"
          type="password"
          autoComplete="off"
          onChange={handleLoginFormChange}
          value={loginForm.password}
        />
        <button className="m-3 p-1 bg-blue-400 rounded-md" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
