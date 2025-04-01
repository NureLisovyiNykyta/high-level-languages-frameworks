import FormTemplate from "./template";
import { useAuth } from "../../authContext";

export const RegisterForm = ({ onBack }) => {
  const { register } = useAuth();

  return (
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
      onBack={onBack}
      className={"register-form"}
      autoComplete="off"
    />
  );
};