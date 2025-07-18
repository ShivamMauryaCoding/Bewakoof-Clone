import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const { data: users } = await axios.get("http://localhost:3000/user");

      const matchedUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (matchedUser) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(matchedUser)); // optional: store session
        navigate("/"); // redirect after login
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border px-3 py-2 rounded mt-1"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border px-3 py-2 rounded mt-1"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
