import React, { useRef, useState } from "react";
import { Cancel, Room } from "@mui/icons-material";
import "./register.css";
import axios from 'axios';
export default function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = axios.post("http://localhost:5000/users", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        TravelMap
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" placeholder="username" ref={nameRef} />
        <input type="email" name="" id="" placeholder="email" ref={emailRef} />
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn">Register</button>
        {success && (
          <span className="success">
            Successfully registered. You can now log in!
          </span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
    </div>
  );
}
