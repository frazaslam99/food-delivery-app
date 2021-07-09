import React, { Component } from "react";
import "./css/FeaturedProductsDetail.css";
import { Radio, Divider, Input, Tabs, Affix, Button, message } from "antd";
import abstract01 from "./Images/abstract01.png";
import abstract02 from "./Images/abstract02.png";
import { connect } from "react-redux";
import store from "../../../store/store";
import { Url } from "../../../Endpoint/index";
import Header2 from "../Header/header2";
// import CollectionMenu from "../Collections/collectionlist";
// import { connect } from "react-redux";
// import { baseUrl } from "../../shared";
const { TabPane } = Tabs;
class ItemDetail extends Component {
  state = {
    carousel_item: 1,
    max_length: 4,
    count: 1,
    mode: "left",
    item: { files: [], productName: "" },
    qnty: 1,
  };

  componentDidMount = () => {
    fetch(Url + "/getSliderProducts", {
      method: "get",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        store.dispatch({
          type: "get_slider_products",
          payload: data,
        });
      });
  };

  addTocartItem = (price, description, title, image, productQuantity) => {
    console.log("image", image);
    let { cart } = this.props;

    // console.log(this.state);
    // let amount = 0;
    var descriptionMatched = false;
    var oldCart = null;
    for (let i = 0; i < cart.length; i++) {
      if (description == cart[i].description) {
        descriptionMatched = true;
        // cart[i].amount++;
        oldCart = descriptionMatched = cart[i];
        break;
      }
    }
    console.log("aaaaaaaa", oldCart);
    if (!descriptionMatched) {
      store.dispatch({
        type: "Add_To_Cart",
        payload: {
          price: price,
          description: description,
          file: image,
          amount: productQuantity,
          title: title,
        },
      });
    } else {
      // alert("item added to cart successfully");\
      console.log(descriptionMatched.productQuantity);
      // console.log("amount", ++descriptionMatched.amount);
      store.dispatch({
        type: "Update_Cart",
        payload: {
          price: price,
          description: description,
          file: image,
          amount: productQuantity + oldCart.amount,
          title: title,
        },
      });
    }
  };

  add(a) {
    console.log("a", a.price);
    let price = a.price;
    console.log(price);
    let newq = this.state.qnty + 1;
    a.amount++;
    this.setState({
      qnty: newq,
      total: this.state.total + price,
    });

    // this.props.handleTotal(this.props.price);
  }
  subtract(a) {
    let price = a.price;
    a.amount--;

    this.setState({
      qnty: this.state.qnty - 1,
      total: this.state.total - price,
    });
    // console.log(this.state.qnty);
    // this.props.handleTotal(-this.props.price);
  }
  render() {
    let mode = "left";
    if (window.innerWidth <= 700) {
      mode = "bottom";
    } else {
      mode = "left";
    }

    const key = "updatable";

    const openMessage = () => {
      message.loading({ content: "Loading...", key });
      setTimeout(() => {
        message.success({
          content: "Item  Added To Cart Successfully!",
          key,
          duration: 2,
        });
      }, 1000);
    };

    return (
      <div>
      
        {/* <CollectionMenu />   */}
        {this.props.nsps
          .filter((item) => {
            return item.description === this.props.match.params.pid;
          })
          .map((item) => {
            console.log('aaaa',item.files)
            return (
              <div className="grid_box">
                <div className=" item1">
                  <div>
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition={mode}
                      className="carousal"
                    >
                      <TabPane
                        tab={
                          <img
                            src={Url + "/subcatuploads/" + item.files[0].filename}
                            alt="asdasd"
                            width="50"
                          />
                        }
                        key={1}
                      >
                        <div
                          className="carousalimg"
                          style={{
                            backgroundImage: `url(${
                              Url + "/subcatuploads/" + item.files[0].filename
                            })`,
                          }}
                        ></div>
                      </TabPane>
                      <TabPane
                        tab={
                          <img
                            src={Url + "/subcatuploads/" + item.files[1].filename}
                            alt="asdasd"
                            width="50"
                          />
                        }
                        key={2}
                      >
                        <div
                          className="carousalimg"
                          style={{
                            backgroundImage: `url(${
                              Url + "/subcatuploads/" + item.files[1].filename
                            })`,
                          }}
                        ></div>
                      </TabPane>
                      <TabPane
                        tab={
                          <img
                            src={Url + "/subcatuploads/" + item.files[2].filename}
                            alt="asdasd"
                            width="50"
                          />
                        }
                        key={3}
                      >
                        <div
                          className="carousalimg"
                          style={{
                            backgroundImage: `url(${
                              Url + "/subcatuploads/" + item.files[2].filename
                            })`,
                          }}
                        ></div>
                      </TabPane>
                    </Tabs>
                    <Divider />
                  </div>
                </div>

                <div className="grid_items">
                  <div className="item_pricing_details">
                    <h1 className="item_Name">{item.title}</h1>
                    <p className="item_Description">{item.description}</p>
                    <p className="item_Price">
                      Rs &nbsp;
                      {item.price}
                      &nbsp; only
                    </p>
                    <del className="item_Price">
                      Rs &nbsp;
                      {item.saleprice}
                      &nbsp; only
                    </del>
                    <Divider />
                    <div>
                      {/* <h5>SIZE</h5>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button
                    value="1"
                    style={{ marginRight: "5px", marginTop: "5px" }}
                  >
                    S
                  </Radio.Button>
                  <Radio.Button
                    value="2"
                    style={{ marginRight: "5px", marginTop: "5px" }}
                  >
                    M
                  </Radio.Button>

                  <Radio.Button
                    value="3"
                    style={{ marginRight: "5px", marginTop: "5px" }}
                  >
                    L
                  </Radio.Button>
                  <Radio.Button
                    value="4"
                    style={{ marginRight: "5px", marginTop: "5px" }}
                  >
                    XL
                  </Radio.Button>
                </Radio.Group> */}
                      <h5 style={{ marginTop: "10px" }}>Quantity</h5>
                      <div className="items" style={{ margin: "10px" }}>
                        <Button
                          disabled={this.state.qnty < 2}
                          className="btn-1"
                          onClick={() => this.subtract(item)}
                        >
                          -
                        </Button>
                        {/* <Button className="btn-2">{this.state.count}</Button> */}
                        <span
                          style={{
                            width: "30px",
                            padding: "0px",
                            textAlign: "center",
                            border: "0",
                          }}
                          size="default"
                        >
                          &nbsp; {this.state.qnty} &nbsp;
                        </span>
                        <Button
                          className="btn-3"
                          onClick={() => this.add(item)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        style={{
                          backgroundColor: "#182e49",
                          color: "white",
                          width: "100%",
                          height: "40px",
                          marginTop: "20px",
                        }}
                        onClick={() =>
                          this.addTocartItem(
                            item.price,
                            item.description,
                            item.title,
                            item.files,
                            this.state.qnty,
                            openMessage()
                          )
                        }
                      >
                        Add to cart
                      </Button>
                      <Divider />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    nsps: store.imgReducer.sliderProduct,
    cart: store.cartReducer.cartItems,
  };
})(ItemDetail);
export default NewVM;
