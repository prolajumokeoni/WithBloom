import { useState } from "react";
import { signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "./form-input";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
   
  // console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       await signInAuthWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      console.log("user not created encountered an error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1> SignIn</h1>
      <form onClick={handleSubmit}>
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
    </div>
  );
};

export default SignIn;
