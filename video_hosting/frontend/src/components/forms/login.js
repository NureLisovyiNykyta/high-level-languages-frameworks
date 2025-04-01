import { useState } from "react";
import FormTemplate from "./template";
import { ResetPasswordForm } from "./resetPassword";
import api from "../../apiConfig";
import { useAuth } from "../../authContext";

export const LoginForm = ({ changeLanguage }) => {
  const { login } = useAuth();
  const [isResetPassword, setIsResetPassword] = useState(false);

  const handleLogin = async (data, setStatus) => {
    try {
      const response = await api.post("/login", data);
      if (response.status === 200) {
        setStatus({ message: "Login successful!", type: "success" });
        setTimeout(() => {
          login();
        }, 1000);
      }
    } catch (error) {
      setStatus({
        message: error.response?.data?.message || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  return isResetPassword ? (
    <ResetPasswordForm changeLanguage={changeLanguage} onBack={() => setIsResetPassword(false)} />
  ) : (
    <FormTemplate
      title="Login"
      buttonText="Log In"
      onSubmit={handleLogin}
      fields={[
        {
          name: "email",
          type: "email",
          placeholder: "Enter your email",
          validation: { required: "Email is required" },
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your password",
          validation: {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
          },
        },
      ]}
      isLogin={true}
      className={"login-form"}
      onForgotPassword={() => setIsResetPassword(true)}
      changeLanguage={changeLanguage}
    />
  );
};
