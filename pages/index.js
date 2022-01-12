import MonForm from "../lib/MonForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Home() {
  return(
    <>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <Container>
          <Row>
            <h1>Find Shiny Pokemon!</h1>
          </Row>
          <Row>
            <MonForm />
          </Row>
        </Container>
      </div>
    </>
  );
}
