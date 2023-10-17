import axios from "axios";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

const Main = (props) => {
  const [editorState, setEditorState] = useState("");
  const emailRef = useRef("");
  const email = useSelector(state => state.user.email);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    // console.log(newEditorState.getCurrentContent().getPlainText());
  };

  const sendMailHandler = async () => {
    try {
      
      const text = editorState.getCurrentContent().getPlainText();
      
      const sendMail = await axios.post("http://localhost:4000/sendmail",JSON.stringify({
        from: email,
        to: emailRef.current.value,
        text
      }),{
        headers:{
          "Content-Type": "application/json"
        }
      })
      
      alert("Mail has been sent");
      props.onSend();
    } catch (error) {
      alert("Sending mail failed!!");
    }
  }

  return (
    <>
      <h1 className="text-center">Welcome to your mailbox</h1>
      <div className="w-75 m-auto">
        <p>
          To: <input ref={emailRef} />
        </p>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          wrapperStyle={{ border: "2px solid black", margin: "1rem 0", backgroundColor: "white" }}
          editorStyle={{ height: "50vh"}}
          onEditorStateChange={onEditorStateChange}
        />
        <Button onClick={sendMailHandler}>Send</Button>
      </div>
    </>
  );
};

export default Main;
