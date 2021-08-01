import React from "react";
import { Row, Col } from "reactstrap";
import whatsapp from "./images/whats-icon.png";
import fb from "./images/fb-icon.png";
import { Url } from "../../../Endpoint/index";
import "./css/newsletter.css";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
class NewsLetter extends React.Component {
  state = {};
  subscription = (event) => {
    event.preventDefault();
    var email = this.refs.myvalue.value;
    fetch(Url + "/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((resp) => {
      // this.notify();
      this.setState({
        mailData: "",
      });
    });
  };
  render() {
    return (
      <div>
        <div className="main-container">
          <Row className="row" id="ro1">
            <Col>
              <h2
                style={{
                  color: "rgba(0, 0, 0, 0.65)",
                  fontFamily: "Old Standard TT",
                }}
              >
                Subscribe to our newsletter
                <hr
                  style={{
                    width: "15%",
                    backgroundColor: "rgba(0, 0, 0, 0.65)",
                  }}
                />
              </h2>
            </Col>
          </Row>
          <Row
            className="row"
            id="ro2"
            style={{
              color: "rgba(0, 0, 0, 0.65)",
              fontFamily: "Old Standard TT",
            }}
          >
            <Col>
              Join Pocket Mart By Fraz and get all the latest news, trends
              and offers
            </Col>
          </Row>
          <Row className="row">
            <Col>
              <form className="form-group" onSubmit={this.subscription}>
                <input id="text-field" type="email" ref="myvalue" required />
                <button id="sub-field">join</button>
              </form>
            </Col>
          </Row>
          <Row className="row">
            <Col>
              <a
                href="https://www.facebook.com/AliExpress/"
                target="_blank"
              >
                {/* <img src={fb} id="fb" alt="fb" /> */}
                <span
                  className="font-header"
                  style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "25px" }}
                >
                  <FaFacebookF />
                </span>
                &nbsp; &nbsp; &nbsp;
              </a>
              <span
                className="font-header"
                style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "25px" }}
              >
                <FaPinterestP />
              </span>
              &nbsp; &nbsp; &nbsp;
              <a
                href="https://www.instagram.com/shopecs/?hl=en"
                target="_blank"
              >
                <span
                  className="font-header"
                  style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "30px" }}
                >
                  <FaInstagram />
                </span>
              </a>
              &nbsp; &nbsp; &nbsp;
              <a href="https://wa.me/923154606900">
                <span
                  className="font-header"
                  style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "30px" }}
                >
                  <FaWhatsapp />
                </span>
              </a>
              {/* <a href="https://wa.me/923006600788">
                
                <img src={whatsapp} id="whats" alt="whatsapp" />
              </a> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default NewsLetter;
