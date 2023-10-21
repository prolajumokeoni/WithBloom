import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // console.log(formFields);
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

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
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
				alert('Email already in use');
			} else {
				console.log('user not created encountered an error', error);
			}
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1> SignUp</h1>
      <form onClick={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
