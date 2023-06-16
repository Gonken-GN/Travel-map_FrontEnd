import React, { useRef, useState } from "react";
import { Cancel, Room } from "@mui/icons-material";
import "./login.css";
import axios from "axios";
export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      username: nameRef.current.value,

      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("http://localhost:5000/users/login", User);
      myStorage.setItem("user", res.data.data.user.username);
      setCurrentUser(res.data.data.user.username);
      setShowLogin(false);
      setError(false);
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

        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn">Login</button>

        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="registerCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
