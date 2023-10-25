import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { nameRegexp } from "../../constants/validation";
import { selectAuthState, setAuthState } from "../../redux/authSlice";
import styles from "./Login.module.scss";

interface FormData {
  name: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { isValid, errors, touchedFields },
  } = useForm<FormData>({
    mode: "onChange",
    shouldUnregister: true,
  });

  const handleLogin = async (formData: FormData) => {
    const isLogin = await fetch(
      "https://technical-task-api.icapgroupgmbh.com/api/login"
    );
    if (username === "testuser" && password === "testpassword123") {
      dispatch(setAuthState(true));
      setError("");

      router.push("/table");
    } else {
      setError("Incorrect username or password");
      dispatch(setAuthState(false));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "name requered",
            },

            pattern: {
              value: nameRegexp,
              message: "Enter valid name",
            },
            minLength: {
              value: 2,
              message: "This field must be longer than 2 characters.",
            },
            maxLength: {
              value: 30,
              message: "This field cannot exceed 30 characters.",
            },
          })}
          name="name"
          id="name"
          type="text"
          placeholder="Username"
          aria-invalid={errors.name ? "true" : "false"}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.name && touchedFields.name && (
          <p className={styles.errorMessage}>{errors.name?.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "password requered",
            },
            minLength: {
              value: 2,
              message: "This field must be longer than 2 characters.",
            },
            maxLength: {
              value: 30,
              message: "This field cannot exceed 30 characters.",
            },
          })}
          name="password"
          id="password"
          aria-invalid={errors.password ? "true" : "false"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && touchedFields.password && (
          <p className={styles.errorMessage}>{errors.password?.message}</p>
        )}
        <button onClick={handleSubmit(handleLogin)} disabled={!isValid}>
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
