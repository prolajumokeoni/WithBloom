import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../auth/form-input";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user not created encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="bg-color">
      <div>
        <h2> Sign Up</h2>
      </div>
      <div>
        <form className="form-inputs" onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />

          <FormInput
            label="ConfirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
            required
          />
          <button type="submit"> Sign Up</button>
        </form>
        <div className="register-text">
          <p className="account">Do you already have an account?</p>
          <Link className="link-color" to="/signin">
            {" "}
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
