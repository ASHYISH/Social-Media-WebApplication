import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";

import "./Signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: response.result,
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
