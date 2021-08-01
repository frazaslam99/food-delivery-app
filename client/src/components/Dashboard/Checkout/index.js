import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Url } from "../../../Endpoint/index";
import { connect } from "react-redux";
import "./css/index.css";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { Badge } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { loadStripe, Elements } from '@stripe/stripe-js';
import onlinepay from "../OnlinePAyment/OnlinePayment"
const key = "updatable";



const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Order Confirmed!", key, duration: 2 });
  }, 1000);
};

const promoValidationMsgfalse = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({
      content: "Please Enter a Valid Promo Code!",
      key,
      duration: 2,
    });
  }, 1000);
};

const promoValidationMsgTrue = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({
      content: "Enjoy The Discount!",
      key,
      duration: 2,
    });
  }, 1000);
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      password: "",
      email: "",
      phoneNo: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
      desc: "",
      price: "",
      country: "",
      cartArray: [],
      promoCode: "",
      promoCodes: [],
      finalAmount: this.props.nTotal + 250,
    };
  }
  componentDidMount() {
    this.setState({
      cartArray: this.props.nCartItems,
    });

    fetch(Url + "/getPromoCodes", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.Success) {
          console.log("promRes", res);
          this.setState({
            promoCodes: res.promoCode,
          });
        }
      });
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  buyNow = (event) => {
    event.preventDefault();
    // debugger;
    let orderDetails = {
      cartNewItems: this.state.cartArray,
      address: this.state.address,
      city: this.state.city,
      phone: this.state.phoneNo,
      email: this.state.email,
      firstName: this.state.fname,
      lastName: this.state.lname,
      totalamount: this.state.finalAmount,
      country: this.state.country,
      status: "Active",
      msgStatus: "UNREAD",
    };
    fetch(Url + "/buyNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderDetails }),
    })
      .then((data) => data.json())
      .then((resp) => {
        if (resp) {
          if (resp.success) {
            this.props.history.push("/");
          }

          openMessage();
        }
      });
  };
  getDiscount = () => {
    for (let i = 0; i < this.state.promoCodes.length; i++) {
      // console.log(
      //   "true",
      //   this.state.promoCode === this.state.promoCodes[i].promoCode
      // );
      if (this.state.promoCode === this.state.promoCodes[i].promoCode) {
        let discountedValue =
          (this.props.nTotal / 100) *
          this.state.promoCodes[i].discountedPercentage;
        let totalValue = this.props.nTotal + 250;
        console.log("discount", discountedValue);
        this.setState({
          finalAmount: totalValue - discountedValue,
          promoCode: "",
        });
        promoValidationMsgTrue();
      } else {
        promoValidationMsgfalse();
      }
    }
  };

  render() {
    return (

      <div
        className="checkout_most_main_div"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <Container>
          <Row style={{ paddingBottom: "20px" }}>
            <Col xs="12" sm="12" md="12" lg="7" xl="7">
              <div className="chckout_details_col1_main_div">
                <div className="co_title_div">
                  <Link to="/" style={{ color: "rgb(4,4,4)" }}>
                    {/* <span>Saphona</span> */}
                  </Link>
                </div>
                {/* form div */}
                <div className="co_form_main_div">
                  <form>
                    <label for="cInfo" className="co_info_title1">
                      Contact Information
                    </label>
                    <input
                      type="text"
                      id="cInfo"
                      name="email"
                      placeholder="Your Email.."
                      className="co_mail_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                      required
                    />

                    <input
                      type="text"
                      name="phoneNo"
                      placeholder="Phone Number"
                      required
                      className="co_phoneNo_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />

                    <label
                      for="onlinepay"
                      className="co_info_title1"
                      style={{ marginTop: "18px" }}
                    >
                      Online Payment
                    </label>
                    <label for="fname">Accepted Cards</label>
                    <div class="icon-container" style={{ padding: "7px 0", fontSize: "24px" }} >
                      <i class="fa fa-cc-visa" style={{ color: "navy" }}></i>
                      <i class="fa fa-cc-amex" style={{ color: "blue" }}></i>
                      <i class="fa fa-cc-mastercard" style={{ color: "red" }} ></i>
                      <i class="fa fa-cc-discover" style={{ color: "orange" }}></i>
                    </div>

                    <label for="cname">Name on Card</label>

                    <input
                      type="text"
                      id="cname"
                      name="Name on Card"
                      required="true"
                      placeholder="Fraz Aslam"
                      className="co_mail_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />

                    <label for="expmonth">Credit card number</label>
                    <input
                      type="text"
                      name="card-number"
                      placeholder="1111-2222-3333-4444"
                      required="true"
                      className="co_phoneNo_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}

                    />

                    <label for="expmonth">Exp Month</label>
                    <input type="text" id="expmonth" name="expmonth" placeholder="September" />

                    <div class="row" style={{ dispaly: "flex", flexWrap: "wrap" }}>
                      <div class="col-50" style={{ flex: "50%", padding: "0 16px" }}>
                        <label for="expyear">Exp Year</label>
                        <input type="text" id="expyear" name="expyear" placeholder="2025" />
                      </div>
                      <div class="col-50" style={{ flex: "50%", padding: "0 16px" }}>
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" placeholder="352" />
                      </div>

                    </div>









                    <label
                      for="cInfo"
                      className="co_info_title1"
                      style={{ marginTop: "18px" }}
                    >
                      Shipping Information
                    </label>
                    <div className="co_FandLname_form_div">
                      <div style={{ width: "50%" }}>
                        <input
                          style={{ width: "95%" }}
                          type="text"
                          name="fname"
                          required
                          placeholder="First Name"
                          className="co_fname_input co_input_tag"
                          onChange={(event) => {
                            this.handleChange(event);
                          }}
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <input
                          type="text"
                          name="lname"
                          required
                          placeholder="Last Name"
                          className="co_lname_input co_input_tag"
                          onChange={(event) => {
                            this.handleChange(event);
                          }}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Address"
                      className="co_address_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      className="co_city_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="country"
                      required
                      className="co_country_input co_input_tag"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <div className="co_FandLname_form_div">
                      <div style={{ width: "50%" }}>
                        <input
                          style={{ width: "95%" }}
                          type="text"
                          name="province"
                          required
                          placeholder="province"
                          className="co_province_input co_input_tag"
                          onChange={(event) => {
                            this.handleChange(event);
                          }}
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="postal Code"
                          required
                          className="co_postalCode_input co_input_tag"
                          onChange={(event) => {
                            this.handleChange(event);
                          }}
                        />
                      </div>
                    </div>

                    {this.state.email !== "" &&
                      this.state.phoneNo !== "" &&
                      this.state.fname !== "" &&
                      this.state.lname !== "" &&
                      this.state.address !== "" &&
                      this.state.city !== "" &&
                      this.state.country !== "" &&
                      this.state.province !== "" &&
                      this.state.postalCode !== "" ? (
                      <input
                        type="submit"
                        value="Submit"
                        onClick={this.buyNow}
                      />
                    ) : (
                      <input
                        type="submit"
                        value="Please Fill All The Fields"
                        // onClick={this.buyNow}
                        disabled={true}
                      />
                    )}
                  </form>
                </div>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" lg="5" xl="5">
              <div className="chckout_details_col2_main_div">
                {/* {this.props.nCartItems.map((item) => {
                 
                  return ( */}
                <div>
                  {this.props.nCartItems.map((item) => {
                    return (
                      <div
                        className="cart-total"
                        style={{ paddingBottom: "20px" }}
                      >
                        <Badge
                          count={item.amount}
                          style={{ backgroundColor: "gray" }}
                        >
                          <div
                            style={{
                              height: "70px",
                              width: "70px",
                              backgroundImage: `url(${Url + "/subcatuploads/" + item.file[0].filename
                                })`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "50% 50%",
                            }}
                          ></div>
                        </Badge>
                        <div
                          className="item item-1"
                          style={{
                            fontSize: "20px",
                            fontFamily: "OLD STANDARD TT",
                            paddingLeft: "30px",
                          }}
                        >
                          {item.title}
                        </div>

                        <div
                          className="item item-2"
                          style={{
                            fontSize: "15px",
                            fontFamily: "OLD STANDARD TT",
                            paddingLeft: "30px",
                          }}
                        >
                          Rs{item.price}
                        </div>
                      </div>
                    );
                  })}

                  {/* show price div checkout */}
                  <hr />
                  <div
                    className="show_price_div_checkout"
                    style={{
                      width: "100%",
                      paddingBottom: "10px",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    <span>Sub-Total</span>
                    <span style={{ float: "right" }}>
                      {`Rs - ${this.props.nTotal}`}
                    </span>
                  </div>
                  <div
                    className="show_price_div_checkout"
                    style={{
                      width: "100%",
                      paddingBottom: "10px",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    <span>Shipping Charges</span>
                    <span style={{ float: "right" }}>Rs - 250</span>
                  </div>
                  <hr />
                  <div>
                    <input
                      type="text"
                      name="promoCode"
                      placeholder="Enter Promo Code To Get Exclusive Discount"
                      className="co_address_input co_input_tag"
                      value={this.state.promoCode}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <button
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#808080",
                        color: "white",
                        padding: "10px 0px",
                      }}
                      onClick={this.getDiscount}
                    >
                      Get Discount
                    </button>
                  </div>
                  <hr />
                  <div
                    className="show_price_div_checkout"
                    style={{
                      width: "100%",
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ float: "right" }}>
                      {`Rs : ${parseInt(this.state.finalAmount)}`}
                    </span>
                  </div>
                  <hr />



                </div>
                {/* );
                })} */}


              </div>
            </Col>
          </Row>
        </Container>


      </div >



    );
  }
}
const mapStateToProps = (store) => {
  return {
    nCartItems: store.cartReducer.cartItems,
    nTotal: store.cartReducer.total,
  };
};

export default connect(mapStateToProps)(Checkout);
