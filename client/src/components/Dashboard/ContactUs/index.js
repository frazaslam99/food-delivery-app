import React from "react";
import "./css/index.css";
import { Container, Row, Col, Button } from "reactstrap";
import Header from "../Header/header";

class ContactUS extends React.Component {
  render() {
    return (
      <div className="contactUs_most_main_div">
        <div className="contactUs_main_div">
          <div>
         
          </div>
          {/* Front Image Div */}
          <div className="contactus_front_img_div">
            <div className="conatactUs_front_img_overlay_div"></div>
            <div className="contactUs_frontImg_upper_text_div">
              <h1 className="upper_text_FI_title">Pocket Mart</h1>
              <h3 className="upper_text_FI_SubTitle">
                <b> YOU’VE GOT PROBLEMS, WE’VE GOT SOLUTIONS</b>
              </h3>
              <h3 className="upper_text_FI_SubTitle">
                <b> FEEL FREE TO CONTACT US</b>
              </h3>
            </div>
          </div>
          {/* Front Image Div End */}
          {/* Information Div Start */}
          <div className="contactUs_info_main_div">
            {/* Title */}
            <div className="contactUs_info_title_div">
              <h2 className="contactUs_info_title_h1">Contact Us</h2>
            </div>
            {/* Detail */}
            <div className="contactUs_info_detail_div">
              <h6 className="contactUs_info_detail_h1">
               For Any Complain or Queries , Call us during business hours, 24/7 from 9a.m. to
                6p.m.
              </h6>
            </div>
            {/* Sub-Deatil */}
            <div className="contactUs_info_SubDetail_div">
              <h5 className="contactUs_info_SubDetail_h1">
                Tel: +923154606900
              </h5>
            </div>
          </div>
          {/*  Information Div End */}
          {/* Grid Contact-Us Form */}
          <div className="grid_contactUs_form_main_div">
            {/* <div className="conatactUs_grid_img_overlay_div"></div> */}
            <Container>
              <Row>
                {/* COl 1  */}
                <Col xs="12" md="6" lg="6" xl="6">
                  <div className="CU_grid_title_col1_div">
                    <h5 className="CU_grid_title_col1_h5">
                      For Further Queries Contact Us
                    </h5>
                    {/* Email input */}
                    <div className="CU_grid_form_main_div">
                      <form>
                        <div className="CU_grid_form_email_input_div">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="CU_grid_form_email_input"
                            autoComplete="off"
                          />
                        </div>
                        {/* Name input */}
                        <div className="CU_grid_form_name_input_div">
                          {/* First Name */}
                          <div className="CU_grid_form_fname_input_div">
                            <input
                              type="text"
                              id="fname"
                              name="firstName"
                              placeholder="First Name"
                              className="CU_grid_form_fname_input"
                              autoComplete="off"
                            />
                          </div>
                          {/* Last Name */}
                          <div className="CU_grid_form_lname_input_div">
                            <input
                              type="text"
                              id="lname"
                              name="lastName"
                              placeholder="Last Name"
                              className="CU_grid_form_lname_input"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="CU_write_anyQuery_div">
                          <textarea
                            type="text"
                            id="queryDetail"
                            name="lastName"
                            placeholder="Write here..!!"
                            className="CU_grid_form_queryDetail_input"
                            rows="4"
                          />
                        </div>
                        {/* send Query Details Button */}
                        <div className="sendQueryBtn_div">
                          <Button
                            color="primary"
                            size="sm"
                            style={{
                              borderRadius: "5px",
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Col>
                {/* COL 2 */}
                <Col xs="12" md="6" lg="6" xl="6">
                  <div className="CU_grid_col2_most_main_div">
                    <div className="CU_grid_col2_main_div">
                      <div className="CU_grid_title_col2_div">
                        <h5 className="CU_grid_title_col2_h5">
                          Contact Information
                        </h5>
                      </div>
                      {/* contact detail 1 */}
                      <div className="grid_col2_cd_main_div">
                        <div className="col2_cd_1_title_detail">
                          <div className="col2_cd_1_title_div">Address</div>
                          <div className="col2_cd_detail_div">
                            FAISALABAD
                          </div>
                        </div>
                        <div className="col2_cd_1_title_detail">
                          <div className="col2_cd_1_title_div">Email</div>
                          <div className="col2_cd_detail_div">
                            frazaslam300@gmail.com
                          </div>
                        </div>
                        <div className="col2_cd_1_title_detail">
                          <div className="col2_cd_1_title_div">Phone</div>
                          <div className="col2_cd_detail_div">
                            +923154606900
                          </div>
                        </div>
                        <div className="col2_cd_1_title_detail">
                          <div className="col2_cd_1_title_div">PHONE-2</div>
                          <div className="col2_cd_detail_div">
                            +92237391881
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactUS;
