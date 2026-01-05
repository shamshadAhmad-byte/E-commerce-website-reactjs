import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import axios from "axios";

export default function Login() {
  const { url, navigate, setToken, token } = useContext(ShopContext);
  const [login, setLogin] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      let newUrl;
      if (login === "login") {
        newUrl = `${url}/api/user/login`;
      } else {
        newUrl = `${url}/api/user/register`;
      }

      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 mx-auto mt-[20px]">
      <h2 className="text-2xl font-bold text-center mb-6">
        {login === "login" ? "login" : "signup"}
      </h2>
      <form onSubmit={onSubmitHandle}>
        {login === "signup" ? (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={onChangeHandle}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="user name"
            />
          </div>
        ) : null}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={onChangeHandle}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={onChangeHandle}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      {login === "login" ? (
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <button
            type="submit"
            className="text-blue-600 hover:underline ml-1"
            onClick={() => setLogin("signup")}
          >
            Signup
          </button>
        </p>
      ) : (
        <p className="mt-4 text-center text-sm text-gray-600">
          You have an account
          <button
            type="submit"
            className="text-blue-600 hover:underline ml-1"
            onClick={() => setLogin("login")}
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
}
