import React from "react";
import { Container, Row } from "reactstrap";
import "./css/introduction.css";

class Introduction extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <div className="introduction_main_div">
              <p>
                Saphona stepped in the market with a vivid vision of catering to
                every need of fashionistas of all ages. From it's wide range of
                intricately fabricated formal-wear to a vast variety of
                casual-wear, Saphona has got you all covered. Saphona's
                idiosyncratic and distinctive luxury prints and intricately
                embroidered apparel will transform you into a head-turner diva.
              </p>
             
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Introduction;
