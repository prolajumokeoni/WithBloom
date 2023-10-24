import { useState } from "react";
import { signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import FormInput from "../auth/form-input";
import { Link } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
      navigate("/");
    } catch (error) {
      console.log("user not created encountered an error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="bg-color">
    <div>
      <h1> Sign In</h1>
    </div>
    <div>
      <form className="form-inputs" onSubmit={handleSubmit}>
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

        <button type="submit"> Sign In</button>
      </form>
      
      <div className="register-text">
          <p className="account">Do you already have an account?</p>
          <Link className="link-color" to="/signup">
            {" "}
            Sign Up
          </Link>
        </div>
    </div>

    </div>
  );
};

export default SignIn;
