import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (values, { resetForm }) => {
    try {
      // Check if user already exists
      const { data: existingUsers } = await axios.get(
        "http://localhost:3000/user"
      );

      const isUserExist = existingUsers.some(
        (user) => user.email === values.email
      );

      if (isUserExist) {
        alert("Email already registered. Try logging in.");
        return;
      }

      // Add new user
      await axios.post("http://localhost:3000/user", values);
      alert("Signup successful!");

      resetForm();
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Field
                name="name"
                type="text"
                className="w-full border px-3 py-2 rounded mt-1"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

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
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
