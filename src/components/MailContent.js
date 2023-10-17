import { Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MailContent = (props) => {
    const mails = props.mails;
    const history = useHistory();

    const clickHandler = (id) => {
        history.push(`/message/${id}`);
    }

    return <div className="p-2">
        <ul style={{listStyle: "none"}}>
            {mails.map(data => (
                <li key={data._id} id={data._id} style={{backgroundColor: "#98dd98"}} onClick={() => clickHandler(data._id)}>           
                    <h4>{!data.read && <Badge bg="primary">0</Badge>}From: {data.from}</h4>
                    <h4>To: {data.to}</h4>
                </li>
            ))}
        </ul>
    </div>
}

export default MailContent;