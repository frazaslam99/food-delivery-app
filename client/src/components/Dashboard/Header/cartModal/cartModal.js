import React, { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import "./cartModal.css";
import { Modal, Button } from "antd";
// import Item from "../itemCollection/items";
import history from "../../../../History/history";
import { Link } from "react-router-dom";
import { Url } from "../../../../Endpoint/index";
import { connect } from "react-redux";
import store from "../../../../store/store";
import "./item.css";

class CartModal extends Component {
  state = {
    visible: false,
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleOk = () => {
    this.setState({ visible: false });
    store.dispatch({
      type: "Handle_Total",
      payload: this.state.total,
    });
  };

  setModalVisible(visible) {
    this.setState({ visible });
  }
  componentDidMount() {
    let { nCartItems } = this.props;
    let a = 0;
    for (let i = 0; i < nCartItems.length; i++) {
      a = a + nCartItems[i].amount;
    }
    console.log(a);
    this.setState({ qnty: a });
  }

  state = {
    open: false,
    items: [""],
    qnty: 0,
    total: 0,
  };
  componentWillReceiveProps(nextProps) {
    const cart = nextProps.nCartItems;
    console.log(cart);
    let a = 0;
    for (let i = 0; i < cart.length; i++) {
      a = a + cart[i].price * cart[i].amount;
    }
    console.log(a);
    this.setState({ total: a });
  }
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
    console.log(this.state.qnty);
    // this.props.handleTotal(-this.props.price);
  }
  removelocal = (item) => {
    store.dispatch({
      type: "Remove-cartItem",
      payload: item,
    });
  };
  render() {
    // console.log(value())
    // this.props.cart.map(data => {
    //   total += Number(data.quantity) * Number(data.price);
    // });

    return (
      <div className="cart-modal">
        <FiShoppingCart
          style={{ cursor: "pointer" }}
          size={25}
          onClick={() => this.setModalVisible(true)}
        />
        <Modal
          className="modal-header"
          width="65vw"
          title="Shopping Cart"
          //   centered
          visible={this.state.visible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <div
              style={{ display: "inline-block", float: "left" }}
              hidden={this.props.nCartItems.length == 0}
            >
              Total Amount :{this.state.total}
            </div>,
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Link to="/checkout">
              <Button
                hidden={this.props.nCartItems.length == 0}
                key="submit"
                type="primary"
                //   loading={loading}
                onClick={this.handleOk}
              >
                Checkout
              </Button>
            </Link>,
          ]}
        >
          {this.props.nCartItems.length == 0 ? (
            <div>Cart is empty Please add some items .!</div>
          ) : (
            this.props.nCartItems.map((item) => {
              console.log("item", item);
              return (
                <div style={{ paddingBottom: "20px" }}>
                  <div className="cart-total">
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        backgroundImage: `url(${
                          Url + "/subcatuploads/" + item.file[0].filename
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                      }}
                    ></div>
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
                    <div
                      className="add-sub-butn"
                      style={{ paddingLeft: "30px" }}
                    >
                      <button
                        id="cart-butn-2"
                        style={{ marginLeft: "4px", border: "1px solid black" }}
                        onClick={() => this.subtract(item)}
                        disabled={item.amount < 2}
                      >
                        -
                      </button>
                      &nbsp;{item.amount}&nbsp;
                      <button
                        id="cart-butn-1"
                        style={{
                          border: "1px solid black",
                        }}
                        onClick={() => this.add(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="del-butn" style={{ paddingLeft: "30px" }}>
                      <button
                        id="del-butn-2"
                        style={{ border: "1px solid black" }}
                        onClick={() => this.removelocal(item)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    nCartItems: store.cartReducer.cartItems,
  };
};

export default connect(mapStateToProps)(CartModal);
