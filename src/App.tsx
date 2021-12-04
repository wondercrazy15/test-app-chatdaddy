import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { Contacts } from './pages';

function App() {
  return (
    <Fragment>
      <Container>
        <Row>
          <Contacts />
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
