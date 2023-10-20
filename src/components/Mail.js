import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import Main from "./main/Main";
import MailContent from "./MailContent";
import { useFetch, useFetchSent } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../stores/user";

const Mail = () => {
  const [composeEmail, setComposeEmail] = useState(true);
  const [emails, setEmails] = useState([]);
  const [emailHeading, setEmailHeading] = useState("");

  const inboxEmails = useFetch();
  const sentEmails = useFetchSent();

  const unReadMailsCount = useSelector(state => state.user.unReadMails);
  const emailId = useSelector((status) => status.user.email);

  const dispatch = useDispatch();

  useEffect(() => {
    let i = 0;
    if(inboxEmails){
      inboxEmails.forEach((data) => {
        if (!data.read) {
          i++;
        }
      });
      dispatch(userActions.updateUnreadMails(i));
    }
  },[dispatch,inboxEmails])

  const composeEmailHandler = () => {
    setComposeEmail(true);
  };

  const inboxEmailHandler = async () => {
    try {
      setEmailHeading("Inbox Mails");
      setEmails(inboxEmails);
      setComposeEmail(false);
    } catch (error) {
      console.log(error);
      setEmails([]);
    }
  };

  const sentEmailHandler = async () => {
    try {
      setEmailHeading("Sent Mails");
      setEmails(sentEmails);
      setComposeEmail(false);
    } catch (error) {
      console.log(error);
      setEmails([]);
    }
  };

  const sendHandler = (toEmailId) => {
      if(toEmailId === emailId){
        dispatch(userActions.updateUnreadMails(unReadMailsCount+1));
      }
  };

  return (
    <Container fluid>
      <Row>
        <Col
          style={{ backgroundColor: "rgb(208, 168, 119)", height: "100vh" }}
          sm={3}
        >
          <br />
          <div className="d-grid gap-2">
            <Button variant="light" size="lg" onClick={composeEmailHandler}>
              Compose
            </Button>
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button variant="light" size="lg" onClick={inboxEmailHandler}>
              Inbox <Badge bg="primary">{unReadMailsCount} unread</Badge>
            </Button>
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button variant="light" size="lg" onClick={sentEmailHandler}>
              Sent
            </Button>
          </div>
          <br />
        </Col>
        <Col style={{ height: "100vh", backgroundColor: "#44f9e3" }} sm={9}>
          {composeEmail ? (
            <Main onSend={sendHandler} />
          ) : (
            <MailContent mails={emails} heading={emailHeading}/>
          )}
        </Col>
      </Row>
    </Container>
    // <>
    // </>
  );
};

export default Mail;
