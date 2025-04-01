import FormTemplate from "./template";
import { useAuth } from "../../authContext";

export const LoginForm = () => {
  const { login } = useAuth();

  return (
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
      className={"login-form"}
    />
  );
};
