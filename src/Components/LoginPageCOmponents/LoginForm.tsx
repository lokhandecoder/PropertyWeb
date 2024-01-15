import React, { useState } from "react";
import backgroundImage from "../path/to/your/background-image.jpg"; // replace with the actual path to your image
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../Services/LoginServices";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isValid = () => {
    return formData.email !== "" && formData.password !== "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {

      try {
        const SendData = await  Login(formData);
        console.log("Data: ", SendData.data);  
        localStorage.setItem("Token", SendData.data.token);
        localStorage.setItem("person", JSON.stringify(SendData.data.person))
        if (SendData.data.token) {
          toast.success('Login Successfully!');
        } else {
          toast.error('Failed to Login, Please try again.');
        }
        // navigate('/')
        window.location.href = "/";

      } catch (error) {
        console.log("Err", error)
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
        <Link to={'/signup'} className="flex justify-center mt-3">Don't have an Account, Signup </Link>
      </form>
    </>
  );
}

export default LoginForm;
