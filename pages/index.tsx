import type { NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import useTheme from 'use-theme-hook';
import style from '../styles/index.module.css';
import cvImg from '../public/cv.png';

const Home: NextPage = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Container fluid className="m-0 p-0 vw-100 vh-100">
      <Row xs={2} className="m-0 w-100 h-100">
        {/* CV button*/}
        <Col
          className={`h-50 bg-info text-light d-flex align-items-center ${style.cv}`}
          style={{ backgroundImage: `url(${cvImg.src})` }}
        >
          <div className="w-100 text-center">
            <h1 className={style.cv}>CV</h1>
          </div>
        </Col>
        <Col className="bg-danger d-flex align-items-center">
          <div className="w-100 text-center">Portfolio</div>
        </Col>
        <Col className="h-50 bg-danger d-flex align-items-center">
          <div className="w-100 text-center">???</div>
        </Col>
        <Col className="bg-info d-flex align-items-center">
          <div className="w-100 text-center">
            <Button variant="primary" onClick={() => setTheme('system')}>
              System
            </Button>
            <Button variant="light" onClick={() => setTheme('light')}>
              Jasny
            </Button>
            <Button variant="dark" onClick={() => setTheme('dark')}>
              Ciemny
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
