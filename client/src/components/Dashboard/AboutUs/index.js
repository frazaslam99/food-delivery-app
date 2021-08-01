import React from "react";
import PropTypes from "prop-types";
import Header2 from "../Header/header2.js";
import { Container } from "reactstrap";
import "./About.css";

function About(props) {
  return (
    <div className="aboutMainContainer">
      
      <Container>
        <div className="aboutContainer">
          <div className="aboutImgContainer">
            <img className="aboutImg" src={require("./images/about.jpg")} alt="" />
          </div>
          <div className="aboutTextContainer">
            <h1 className="aboutH1">
             About Us
            </h1>
            <p className="aboutp">
            Our mission is what drives us to do everything possible to expand human potential. We do that by creating groundbreaking sport innovations, by making our products more sustainably, by building a creative and diverse global team and by making a positive impact in communities where we live and work.
            </p>
          </div>
        </div>
        <div>
          <hr className="abouthr" />
        </div>

        <div className="aboutContainer">
          <div className="aboutTextContainer " id="aboutTextContainer2">
            <h1 className="aboutH1" id="aboutH1-2">
              WE CONVERT IDEAS INTO REALITY
            </h1>
            <p className="aboutp">
              We are fast fashion brand that is data driven & makes designs as
              per what our customers want. We focus on the future, work on
              expansion and strive to be the best for you. You demand, we create
              Launched in 2021, Store stepped in the market with a vivid
              vision of catering to every need of fashionistas of all ages. From
              it's wide range of intricately fabricated formal-wear to a vast
              variety of casual-wear, Saphona has got you all covered. Saphona's
              idiosyncratic and distinctive luxury prints and intricately
              embroidered apparel will transform you into a head-turner diva.
              The fusion of aesthetic designs with high-quality Products will
              upgrade your wardrobe and that too in affordable prices. Our aim
              is to make exclusive fashion attire accessible to customers of all
              ages.
            </p>
          </div>
          <div className="aboutImgContainer">
            <img
              className="aboutImg"
              src={require("./images/pic2.jpeg")}
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

About.propTypes = {};

export default About;
