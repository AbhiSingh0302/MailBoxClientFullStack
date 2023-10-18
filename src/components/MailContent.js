import axios from "axios";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MailContent = (props) => {
  const mails = props.mails;
  const history = useHistory();

  const token = useSelector(status => status.user.token);

  const clickHandler = (id) => {
    history.push(`/message/${id}`);
  };

  const deleteHandler = (id) => {
    axios.get(`http://localhost:4000/delete-mail/${id}`,{headers:{token}})
    .then(resp => {
        console.log(resp);
    })
  }

  return (
    <div className="p-2">
      <ul style={{ listStyle: "none" }}>
        {mails.map((data) => (
          <li
            key={data._id}
            id={data._id}
            style={{ backgroundColor: "#98dd98", margin: "1rem", padding: "1rem"}}
            onClick={() => clickHandler(data._id)}
          >
            <div className="d-flex justify-content-between">
              <div>
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
