import "./Login.css";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { login, signup } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let errors = {};

    // Name validation (only for Sign Up)
    if (signState === "Sign Up") {
      if (!name.trim()) {
        errors.name = "Name is required";
      } else if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long";
      }
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      errors.password = "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [name, email, password, signState]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const user_auth = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      setLoading(true);
      if (signState === "Sign In") {
        await login(email.trim(), password);
      } else {
        await signup(name.trim(), email.trim(), password);
      }
      setLoading(false);
    }
  };

  return (
    loading ? 
    <div className="login-spinner"><img src={netflix_spinner} alt="loading" /></div> :
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <div>
              <input
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
                type="text"
                placeholder="Your name"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          )}
          <div>
            <input
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" disabled={!isFormValid}>
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor=""> Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span onClick={() => setSignState("Sign In")}>
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;