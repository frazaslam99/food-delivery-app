import React, { Component } from "react";
import { connect } from "react-redux";
import { Url } from "../../../Endpoint/index";
import Header2 from "../Header/header2";
import { Button } from "reactstrap";
import { message } from "antd";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import store from "../../../store/store";
import "./css/products.css";
// import "./maahru.css";

class ShowAllSubCatProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentPage: 1,
      todosPerPage: 10,
      currentTodos: [],
      searchword: "",
      loader: true,
      abc: 3,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }
  componentWillReceiveProps = (nextProps, prev) => {
    // console.log("Mahru", nextProps.subCatProducts);
    this.setState({
      todos: nextProps.subCatProducts,
    });
  };

  componentDidMount() {
    console.log("props", this.props.match.params.subCateg);
    fetch(
      Url +
      `/showSubCatAllPdNew/?maincategory=${this.props.match.params.maincategory}&subcateg=${this.props.match.params.subCateg}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("dataaaaaaaaa", data.searchdata);
        if (data.success) {
          this.setState({
            loader: false,
          });
          console.log("productsData", data);
          store.dispatch({
            type: "SHOW_SUBCAT_NEW_PRODUCTS",
            payload: data.searchdata,
          });
        } else {
          this.setState({
            loader: false,
          });
        }
      });
  }
  addTocartItem = (price, description, title, image) => {
    let { cart } = this.props;
    // console.log(this.state);
    let amount = 0;
    var descriptionMatched = false;
    for (let i = 0; i < cart.length; i++) {
      if (description == cart[i].description) {
        descriptionMatched = true;
        // cart[i].amount++;
        descriptionMatched = cart[i];
        break;
      }
    }

    if (!descriptionMatched) {
      store.dispatch({
        type: "Add_To_Cart",
        payload: {
          price: price,
          description: description,
          file: image,
          amount: 1,
          title: title,
        },
      });
    } else {
      store.dispatch({
        type: "Update_Cart",
        payload: {
          price: price,
          description: description,
          file: image,
          amount: ++descriptionMatched.amount,
          title: title,
        },
      });
    }
  };
  deleteProducts = (event, id) => {
    // let getparentNode = event.target.parentNode.parentNode;
    fetch(Url + "/deleteProducts/" + id, {
      method: "DELETE",
      // body: formdata
    }).then(function (res) {
      store.dispatch({
        type: "DELETE_PRODUCT",
        payload: id,
      });
      // getparentNode.remove();
    });
  };
  filterList = (e) => {
    this.setState({
      searchword: e.target.value,
    });
    const products = this.props.subCatProducts;
    const filtereditem = products.filter((p) =>
      p.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log("item", filtereditem);
    this.setState({
      todos: filtereditem,
    });
  };
  onPageChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
    this.setState({
      currentPage: pageNumber,
    });
  };
  render() {
    // let { loader } = this.state;
    const key = "updatable";
    const openMessage = () => {
      message.loading({ content: "Loading...", key });
      setTimeout(() => {
        message.success({
          content: "Item Added To Cart Successfully!",
          key,
          duration: 2,
        });
      }, 1000);
    };
    const { currentPage, todosPerPage, todos, img, loader } = this.state;
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    let filetoshow;
    if (this.state.searchword.length != 0) {
      filetoshow = this.state.todos;
    } else {
      filetoshow = currentTodos;
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          style={{ paddingLeft: "2%" }}
        >
          {number}
        </li>
      );
    });
    return (
      <div>
        {console.log("checklength", renderPageNumbers.length)}

        {loader ? (
          // <div className="loading">{/* Loader */}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <Spinner animation="grow" />
          </div>
        ) : (
          <div>
            <div
              style={{
                textTransform: "uppercase",
                fontFamily: "OLD STANDARD TT",
                paddingBottom: "20px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                paddingTop: "5%",
                fontSize: "1.4rem",
              }}
            >
              {this.props.match.url.slice(9)}
            </div>
            <hr style={{ width: "60px", backgroundColor: "Black" }} />
            <span style={{ display: "flex", justifyContent: "center" }}>
              <form>
                <input
                  type="text"
                  name="search"
                  placeholder="Search.."
                  className="searchProduct_input"
                  autoComplete="off"
                  onChange={this.filterList}
                />
              </form>
            </span>
            <hr style={{ width: "60px", backgroundColor: "Black" }} />
            <div className="FCD_main_div">
              {filetoshow.length > 0 ? (
                filetoshow.map((item) => {
                  return (
                    <div
                      className="FCD_product_div"
                      style={{ position: "relative" }}
                    >
                      <div className="btn_addTOcart_div">
                        <Button
                          color="primary"
                          size="lg"
                          className="cart_btn_span"
                          onClick={() =>
                            this.addTocartItem(
                              item.price,
                              item.description,
                              item.title,
                              item.files,
                              openMessage()
                            )
                          }
                        >
                          ADD TO CART
                        </Button>
                      </div>
                      <Link
                        to={`/Catelog/${item.mainCat}/${item.subCat}/productdetails/${item._id}`}
                      >
                        <div
                          className="bg_img_product_div"
                          style={{
                            width: "330px",
                            height: "500px",
                            backgroundImage: `url(${Url + "/subcatuploads/" + item.files[0].filename
                              }`,
                            backgroundPosition: "50% 50%",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </Link>
                      <div className="FCD_desc_div">
                        {" "}
                        <i> {item.title} </i>{" "}
                      </div>
                      <div className="FCD_price_div">
                        {" "}
                        <i> Rs-{item.price + " "}only </i>{" "}
                      </div>
                      <div hidden={this.props.isAuthenticated == false}>
                        <button
                          onClick={(event) =>
                            window.confirm(
                              "are you sure you want to delete this ?"
                            )
                              ? this.deleteProducts(event, item._id)
                              : null
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <img
                    style={{
                      width: "60vw",
                    }}
                    src={require("./noPdFound.png")}
                  />
                </div>
              )}
            </div>

            <div
              style={{
                padding: "40px 10px 10px 10px",
              }}
            >
              {renderPageNumbers.length == 0 ? null : (
                <Pagination
                  showQuickJumper
                  current={currentPage}
                  defaultCurrent={currentPage}
                  // id=
                  pageSize={todosPerPage}
                  total={todos.length}
                  onChange={this.onPageChange}
                // disabled={renderPageNumbers.length == 0}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    subCatProducts: store.imgReducer.subCatProducts,
    cart: store.cartReducer.cartItems,
    isAuthenticated: store.adminReducer.isAuthenticated,
  };
})(ShowAllSubCatProducts);
export default NewVM;

// ShowAllSubCatProducts
