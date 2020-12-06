import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh, faTree, faCandyCane, faSnowman, faMugHot, faHollyBerry, faSnowflake, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';

function Home() {


  return (
    <Row>
      <Col>
        <h1>
          <FontAwesomeIcon icon={faTree} />
          <FontAwesomeIcon icon={faSnowman} />
          <FontAwesomeIcon icon={faCandyCane} />
          <FontAwesomeIcon icon={faGlassWhiskey} />
          {' '}
          Bryant's Advent of Code 2020
          {' '}
          <FontAwesomeIcon icon={faMugHot} />
          <FontAwesomeIcon icon={faHollyBerry} />
          <FontAwesomeIcon icon={faSnowflake} />
          <FontAwesomeIcon icon={faSleigh} />
        </h1>
      </Col>
    </Row>
  );
}

export default Home;