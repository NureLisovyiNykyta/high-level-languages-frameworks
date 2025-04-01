import './template.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormTemplate = ({
  title,
  fields,
  onSubmit,
  buttonText,
  className,
  onBack,
  additional,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ message: null, type: null });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data, setStatus);
    } catch (error) {
      setStatus({
        message: error.response?.data?.message || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className={`form-template ${className}`}>
      <div className='header'>
        <div className='title'>
          {onBack && <IoArrowBackOutline className='icon' onClick={onBack} />}
          {title}
        </div>
      </div>
      {status.message && <div className={`status ${status.type}`}>{status.message}</div>}
      <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
        {fields.map(({ name, type, placeholder, validation }) => (
          <div className='form-group' key={name}>
            <input
              placeholder={placeholder}
              type={name === "password" && showPassword ? 'text' : type}
              {...register(name, validation)}
              autoComplete={name === "password" ? "new-password" : "off"}
            />
            {errors[name] && <p className='error'>{errors[name].message}</p>}
            {name === "password" && (
              showPassword ?
                <FiEyeOff className='icon' onClick={() => setShowPassword(false)} /> :
                <FiEye className='icon' onClick={() => setShowPassword(true)} />
            )}
          </div>
        ))}
        <button type='submit'>{buttonText}</button>
      </form>
      {additional && (
        <div className="additional">
          {additional}
        </div>
      )}
    </div>
  );
};

export default FormTemplate;
