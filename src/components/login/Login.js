import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Login = (props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const history = useHistory();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });

      const user = await axios.post("http://localhost:4000/login",JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),{
          headers:{
            "Content-Type": "application/json"
          }
        });

      if(user.data.success){
        history.replace("/main");
        localStorage.setItem("authMailToken",user.data.token)
      }else{
        alert("Failed!!");
      }

      emailRef.current.value = "";
      passwordRef.current.value = "";

    } catch (error) {
      console.log(error);

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
    
  };

  return (
    <Form className="signup" onSubmit={submitHandler}>
      <h3 className="text-center my-4">Login</h3>
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
      <div className="d-grid">
        <Button variant="primary" size="md" type="submit" className="mb-2">
          Login
        </Button>
        <p className="text-center">New User <Link to="/">SignUp</Link></p>
      </div>
    </Form>
  );
};

export default Login;
