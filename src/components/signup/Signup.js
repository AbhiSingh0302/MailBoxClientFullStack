import { Button, FloatingLabel, Form } from "react-bootstrap";
import "./Signup.css";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Signup = (props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        cnfmpass: confirmPasswordRef.current.value,
      });
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        alert("password do not match");
      } else {
        alert(`Hello ${emailRef.current.value}`);
      }

      const user = await axios.post("http://localhost:4000/signup",JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),{
          headers:{
            "Content-Type": "application/json"
          }
        });

      console.log(user);

      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";

    } catch (error) {
      console.log(error);

      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }

  };

  return (
    <Form className="signup" onSubmit={submitHandler}>
      <h3 className="text-center my-4">SignUp</h3>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          ref={emailRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword2"
        label="Confirm Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          ref={confirmPasswordRef}
          required
        />
      </FloatingLabel>
      <div className="d-grid">
        <Button variant="primary" size="md" type="submit" className="mb-2">
          Sign Up
        </Button>
        <p className="text-center">Already a user <Link to="/login">Login</Link></p>
      </div>
    </Form>
  );
};

export default Signup;
