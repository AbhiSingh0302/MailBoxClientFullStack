import { useState } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import Main from "./main/Main";

const Mail = () => {
  const [compose, setCompose] = useState(false);  

  const composeEmailHandler = () => {
    setCompose(true);
  }
  
  return (
    <Container fluid>
      <Row>
        <Col style={{backgroundColor: "rgb(208, 168, 119)", height: "100vh"}} sm={3}>
            <br/>
        <div className="d-grid gap-2">
              <Button variant="light" size="lg" onClick={composeEmailHandler}>
                Compose
              </Button>
            </div>
            <br/>
            <div className="d-grid gap-2">
              <Button variant="light" size="lg">
                Inbox
              </Button>
            </div>
          <br />
            <div className="d-grid gap-2">
              <Button variant="light" size="lg">
                Sent
              </Button>
            </div>
          <br />
            
        </Col>
        <Col style={{height: "100vh", backgroundColor: "#44f9e3"}} sm={9}>{compose && <Main/>}</Col>
      </Row>
    </Container>
    // <>
    // </>
  );
};

export default Mail;
