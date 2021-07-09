import React from "react";
import { Container, Row, Col } from "reactstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "./footer.css";
import fb from "./faceBook.png";
import pinterest from "./pinterest.png";
import insta from "./instagram.png";

const dateToFormat = new Date();
export default class Footer extends React.Component {
  render() {
    return (
      <div className="main_container" style={{ paddingBottom: "80px" }}>
        <hr
          style={{
            width: "80px",
            marginBottom: "80px",
            background: "grey",
          }}
        />
        <Container>
          <Row>
            <Col xs="12" sm="12" md="6" lg="4" xl="4">
              <div className="main_div_col1">
                <li className="list_1">
                  <Link
                    to="/privacy-policy"
                    style={{
                      textDecoration: "none",
                      color: "rgb(119, 126, 126)",
                    }}
                  >
                    <span className="text_div">Return Policy</span>
                  </Link>
                </li>
                <li className="list_1">
                  <Link
                    to="/privacy-policy"
                    style={{
                      textDecoration: "none",
                      color: "rgb(119, 126, 126)",
                    }}
                  >
                    <span className="text_div">Privacy Policy</span>
                  </Link>
                </li>
                {/* <li className="list_1">
                  <span className="text_div">Blog</span>
                </li> */}
                <li className="list_1">
                  <Link
                    to="/contact-us"
                    style={{
                      color: "#777e7e",
                    }}
                  >
                    <span className="text_div">Contact us</span>
                  </Link>
                </li>
                <li className="list_1">
                  <Link
                    to="/about-us"
                    style={{
                      color: "#777e7e",
                    }}
                  >
                    <span className="text_div">About us</span>
                  </Link>
                </li>
              </div>
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" xl="4">
              <div className="main_div_col2">
                <a
                  href="https://www.facebook.com/Saphona-By-Zainab-Ibrahim-412989482792105/"
                  target="_blank"
                  style={{ color: "rgb(119, 126, 126)" }}
                >
                  <div className="pic_div">
                    <span className="text_div">
                      <img className="fbImg" src={fb} alt="" />
                    </span>
                    <span class="text_div">Facebook</span>
                  </div>
                </a>
                {/* <div className="pic_div">
                  <span className="text_div">
                    <img className="fbImg" src={pinterest} alt="" />
                  </span>
                  <span class="text_div">Pinterest</span>
                </div> */}
                <a
                  href="https://www.instagram.com/saphona_official/"
                  target="_blank"
                  style={{ color: "rgb(119, 126, 126)" }}
                >
                  <div className="pic_div">
                    <span className="text_div">
                      <img className="fbImg" src={insta} alt="" />
                    </span>
                    <span class="text_div">Instagram</span>
                  </div>
                </a>
              </div>
            </Col>

            <Col>
              <div className="main_div_column_3">
                <div className="add">
                  <div class="text_div">
                    Copyright © <Moment format="YYYY">{dateToFormat}</Moment>,
                    Saphona By Zainab Ibrahim
                    <div>
                      Officially Affiliated with :
                      <span style={{ fontWeight: "bold", paddingLeft: "3px" }}>
                        AuraApperals
                      </span>
                    </div>
                  </div>
                  <div
                    className="imgs"
                    style={{ paddingLeft: "10px", paddingTop: "10px" }}
                  >
                    <img className="fbImg" src={pinterest} alt="" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
