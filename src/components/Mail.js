import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import Main from "./main/Main";
import MailContent from "./MailContent";
import { useSelector } from "react-redux";
import axios from "axios";

const Mail = () => {
  const [compose, setCompose] = useState(true);

  const [emailState, setEmailStateStatus] = useState([]);

  const emailId = useSelector(status => status.user.email);

  const token = useSelector(status => status.user.token);

  const [unReadMails, setUnReadMails] = useState("");

  useEffect(() => {

    const intervalId = setInterval(() => {
      console.log("hello");
      axios.get(`http://localhost:4000/getmail`, {
        params: {
          status: "inbox",
          email: emailId
        },
        headers:{token}
      }).then(resp => {
        let i=0;
        const emails = resp.data.data;
        emails.forEach(data => {
          if(!data.read){
            i++;
          }
        })
        setUnReadMails(i);
      })
    }, 2000) 
    
    return () => {
      clearInterval(intervalId);
    }

  },[emailId, token])

  const composeEmailHandler = () => {
    setCompose(true);
  };

  const inboxEmailHandler = async () => {
    try {
    setCompose(false);

    const emails = await axios.get(`http://localhost:4000/getmail`, {
      params: {
        status: "inbox",
        email: emailId
      },headers:{token}
    });
    setEmailStateStatus(emails.data.data);
  } catch (error) {
    console.log(error);
    setEmailStateStatus([]);
  }
  };

  const sentEmailHandler = async () => {
    try {
    setCompose(false);

    const emails = await axios.get(`http://localhost:4000/getmail`, {
      params: {
        status: "sent",
        email: emailId
      },headers:{token}
    });
    setEmailStateStatus(emails.data.data);
  } catch (error) {
    console.log(error);
    setEmailStateStatus([]);
  }
  };

  const sendHandler = () => {
    axios.get(`http://localhost:4000/getmail`, {
      params: {
        status: "inbox",
        email: emailId
      },headers:{token}
    }).then(resp => {
      let i=0;
      const emails = resp.data.data;
      emails.forEach(data => {
        if(!data.read){
          i++;
        }
      })
      setUnReadMails(i);
    })
  }

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
              Inbox <Badge bg="primary">{unReadMails} unread</Badge>
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
          {compose ? <Main onSend={sendHandler}/> : <MailContent mails={emailState} />}
        </Col>
      </Row>
    </Container>
    // <>
    // </>
  );
};

export default Mail;
