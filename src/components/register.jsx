import React, { useRef, useState } from "react";
import { Room } from "@mui/icons-material";
import "./register.css";

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        TravelMap
      </div>
      <form action="">
        <input type="text" name="" id="" placeholder="username" />
        <input type="email" name="" id="" placeholder="email" />
        <input type="password" name="" id="" placeholder="password" />
        <button className="registerBtn">Register</button>
        <span className="success">Successfully registered. You can now log in!</span>
        <span className="failure">Something went wrong!</span>
      </form>
    </div>
  );
}
