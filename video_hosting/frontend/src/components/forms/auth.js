import FormTemplate from "./template";
import { useAuth } from "../../authContext";
import { useState } from "react";

const AuthForm = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Перемикач між формами

  const toggleForm = () => {
    setIsLogin(!isLogin); // Змінює стан між входом і реєстрацією
  };

  return isLogin ? (
    <FormTemplate
      title="Login"
      buttonText="Log In"
      onSubmit={login}
      fields={[
        {
          name: "email",
          type: "email",
          placeholder: "email",
          validation: { required: "Email is required" },
        },
        {
          name: "password",
          type: "password",
          placeholder: "password",
          validation: {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
          },
        },
      ]}
      className="login-form"
      additional={
        <div>
          Don't have an account?{" "}
          <button type="button" onClick={() => setIsLogin(false)} className="link-button">
            Register
          </button>
        </div>
      }
    />
  ) : (
    <FormTemplate
      title="Join the community"
      buttonText="Register"
      onSubmit={register}
      fields={[
        {
          name: "name",
          type: "text",
          placeholder: "name",
          validation: { required: "Name is required" },
        },
        {
          name: "email",
          type: "email",
          placeholder: "email",
          validation: { required: "Email is required" },
        },
        {
          name: "password",
          type: "password",
          placeholder: "password",
          validation: {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          },
        },
      ]}
      className={"register-form"}
      onBack={toggleForm} // Кнопка "Назад" повертає до форми входу
    >
      <div className="additional">
        <p>Already have an account?</p>
        <button type="button" onClick={toggleForm} className="link-button">
          Log In
        </button>
      </div>
    </FormTemplate>
  );
};

export default AuthForm;