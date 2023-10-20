import axios from "axios";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userActions } from "../stores/user";
import { useEffect, useState } from "react";

const MailContent = (props) => {
  const [mails,setMails] = useState([]);

  useEffect(() => {
    setMails(props.mails);
  },[props.mails])

  const history = useHistory();

  const token = useSelector(status => status.user.token);
  const unReadMailsCount = useSelector(state => state.user.unReadMails);
  const emailId = useSelector((status) => status.user.email);
  const dispatch = useDispatch();


  const clickHandler = (email) => {
    if(email.to === emailId && !email.read){
      dispatch(userActions.updateUnreadMails(unReadMailsCount-1));
    }
    history.push(`/message/${email._id}`);
  };

  const deleteHandler = (id) => {
    axios.get(`http://localhost:4000/delete-mail/${id}`,{headers:{token}})
    .then(resp => {
        console.log(resp);
        setMails(items => items.filter(item => item._id !== id));
    })
  }

  return (
    <div className="p-2" style={{height: "100vh", overflow: "auto"}}>
      <h2 className="text-center">{props.heading}</h2>
      <ul style={{ listStyle: "none"}}>
        {mails.map((data) => (
          <li
            key={data._id}
            id={data._id}
            style={{ backgroundColor: "#98dd98", margin: "1rem", padding: "1rem"}}
          >
            <div className="d-flex justify-content-between">
              <div onClick={() => clickHandler(data)}>
                <h4>
                  {!data.read && <Badge bg="primary">0</Badge>}From: {data.from}
                </h4>
                <h4>To: {data.to}</h4>
              </div>
              <div className="align-self-center"><Button variant="dark" size="lg" onClick={() => deleteHandler(data._id)}>Delete</Button></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MailContent;
