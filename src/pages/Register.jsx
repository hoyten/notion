import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/usersApi";
import { DATE, EMAIL_REGEXP, PASS_REGEXP } from "../constants";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    Rpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleRegister = async () => {
    setErrorMessage("");
    const { email, password, Rpassword } = formData;

    if (!EMAIL_REGEXP.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    const simplePassRegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!simplePassRegExp.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter and one number."
      );
      return;
    }

    if (password !== Rpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const user = {
      email,
      password,
      createdAt: DATE,
    };

    try {
      await getUsers(user);
      navigate("/login"); 
    } catch (error) {
      setErrorMessage("Error during registration, please try again.");
    }
  };

  return (
    <div className="min-h-screen px-10 py-8 m-0 flex flex-col justify-center items-center bg-[#f4f4f9]">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <p className="text-3xl font-semibold text-center mb-6">Register</p>
        <div className="flex flex-col gap-4">
          <input
            className="bg-[#f0f0f0] py-3 px-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="bg-[#f0f0f0] py-3 px-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            className="bg-[#f0f0f0] py-3 px-4 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
            type="password"
            name="Rpassword"
            placeholder="Repeat password"
            value={formData.Rpassword}
            onChange={handleInputChange}
          />
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
          <button
            onClick={handleRegister}
            className="bg-[#800000] text-white py-3 px-6 text-xl rounded-md hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#660000] transition-all duration-300"
          >
            Register
          </button>
        </div>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-600">
        <p>
          Created by{" "}
          <a
            href="https://github.com/NastyaBoboed"
            className="text-[#800000] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nastya Boboed
          </a>{" "}
          &copy; 2024
        </p>
      </footer>
    </div>
  );
}
