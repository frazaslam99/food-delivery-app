import React, { Component } from "react";
import { Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import "./header.css";
import Logo from "./images/logo.png";
import { Url } from "../../../Endpoint/index";
import { connect } from "react-redux";
import CartModal from "./cartModal/cartModal";
import MenuDrawer from "./Drawer/drawer";
import { withRouter } from "react-router-dom";
import store from "../../../store/store";

const style = {
  link: { backgroundColor: "transparent", fontSize: "15px" },
  heading: {
    fontFamily: "times new roman",
    fontWeight: 700,
    fontSize: "45px",
  },
};
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgPosition: "static",
      saphonaSubCats: [],
      auraSubCats: [],
      hoverImage: "",
      hoverImageAura: "",
    };
  }

  componentDidMount() {
    fetch(Url + "/getSubCatD", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("Dataaaa", data);
        store.dispatch({
          type: "SUB_CAT_D",
          payload: data,
        });
      });
  }

  componentWillReceiveProps = (nextP, prevS) => {
    let saphonacat = nextP.subCats
      .filter((item) => {
        return item.maincategory == "Saphona";
      })
      .map((item) => {
        // console.log("sapItem", item);
        return item;
      });
    // console.log("cattttttttttt", saphonacat);
    this.setState({
      saphonaSubCats: saphonacat,
      hoverImage: saphonacat && saphonacat[0] && saphonacat[0].file,
    });

    // for aura

    let auraCat = nextP.subCats
      .filter((item) => {
        return item.maincategory == "Aura";
      })
      .map((item) => {
        // console.log("itemmmmm", item);
        return item;
      });
    console.log("auraaaaaaa", auraCat);
    this.setState({
      auraSubCats: auraCat,
      hoverImageAura: auraCat && auraCat[0] && auraCat[0].file,
    });
  };

  sendReqToGetProduct = (event, maincategory, subCategory) => {
    // console.log("mainCat", maincategory);
    // console.log("mainCatValue", subCategory);

    fetch(
      Url +
        // `/showSubCatAllPdNew/?subcateg=${event.target.value}`
        `/showSubCatAllPdNew/?maincategory=${maincategory}&subcateg=${subCategory}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          store.dispatch({
            type: "SHOW_SUBCAT_NEW_PRODUCTS",
            payload: data.searchdata,
          });
        }
      });
  };

  // onBgColorChange = bgPosition => {
  //   // localStorage.setItem("bgPosition", bgPosition);
  //   this.setState({
  //     bgPosition: bgPosition
  //   });
  // };
  render() {
    const color = "black";
    // console.log(
    //   "here is your image=====>",
    //   this.state.saphonaSubCats && this.state.saphonaSubCats[0]
    //     ? this.state.saphonaSubCats[0].file
    //     : ""
    // );
    return (
      <div
        className="headr_main_div"
        style={{
          position: this.state.bgPosition,
          zIndex: 10,
          top: 0,
          width: "100%",
          paddingTop: "15px",
        }}
      >
        <div style={{ backgroundColor: "transparent", zIndex: 10 }}>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                className="menu_icon"
                style={{
                  flexGrow: "inherit",
                  marginLeft: "10px",
                  paddingTop: "20px",
                }}
              >
                <MenuDrawer color={color} />
              </div>
              <div
                className="logo"
                style={{
                  marginLeft: "10%",
                  flexGrow: "inherit",
                  textAlign: "center",
                }}
              >
                <Link to="/">
                  <div style={{ paddingTop: "10px" }}>
                    <img src={Logo} className="siteLogo_saphona" />
                    {/* &nbsp; &nbsp;
                    <h1 style={{ color: color, ...style.heading }}>SAPHONA</h1> */}
                  </div>
                </Link>
              </div>
            </Col>

            <Col span={12}>
              <div className="headerRight">
                <ul style={{ listStyle: "none" }} className="ul">
                  <li className="listitem responsive">
                    <Link
                      to="/"
                      // onClick={()=>this.onBgColorChange('static')}
                      style={{ color: color, ...style.link }}
                    >
                      HOME
                    </Link>
                  </li>

                  <li className="listitem responsive">
                    <div class="dropdown">
                      <span className="dropbtn">Saphona</span>
                      <div class="dropdown-content">
                        <div className="drop-inner">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "39%",
                            }}
                          >
                            {this.state.saphonaSubCats.map((item, index) => {
                              return (
                                <Link
                                  to={`/catelog/Saphona/${item.subCateg}`}
                                  onMouseOver={() =>
                                    this.setState({
                                      hoverImage: item.file ? item.file : null,
                                    })
                                  }
                                  onMouseOut={() =>
                                    this.setState({
                                      hoverImage:
                                        this.state.saphonaSubCats &&
                                        this.state.saphonaSubCats[0] &&
                                        this.state.saphonaSubCats[0].file,
                                    })
                                  }
                                >
                                  <span
                                    className="dpdwn_link"
                                    onClick={(event) =>
                                      this.sendReqToGetProduct(
                                        event,
                                        "Saphona",
                                        item.subCateg
                                      )
                                    }
                                  >
                                    {item.subCateg}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <img
                            style={{
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                            src={this.state.hoverImage}
                            width="300px"
                            height="450px"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="listitem responsive">
                    <div class="dropdown">
                      <span className="dropbtn">Aura</span>
                      {this.state.auraSubCats.length > 0 ? (
                        <div class="dropdown-content">
                          <div className="drop-inner">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "39%",
                              }}
                            >
                              {this.state.auraSubCats.map((item) => {
                                return (
                                  <Link
                                    to={`/catelog/Aura/${item.subCateg}`}
                                    onMouseOver={() =>
                                      this.setState({
                                        hoverImageAura: item.file
                                          ? item.file
                                          : null,
                                      })
                                    }
                                    onMouseOut={() =>
                                      this.setState({
                                        hoverImageAura:
                                          this.state.auraSubCats &&
                                          this.state.auraSubCats[0] &&
                                          this.state.auraSubCats[0].file,
                                      })
                                    }
                                  >
                                    <span
                                      className="dpdwn_link"
                                      onClick={(event) =>
                                        this.sendReqToGetProduct(
                                          event,
                                          "Aura",
                                          item.subCateg
                                        )
                                      }
                                    >
                                      {item.subCateg}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                            <img
                              style={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              src={this.state.hoverImageAura}
                              width="300px"
                              height="450px"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </li> */}

                  {/* <li className="listitem responsive">
                    <Link
                      to=""
                      style={{ backgroundColor: "transparent", color: color }}
                    >
                      <MdSearch size={25} />
                    </Link>
                  </li> */}

                  <li
                    style={{ backgroundColor: "transparent", color: color }}
                    className="listitem "
                  >
                    <Badge
                      // count={this.props.cart.length}
                      style={{
                        borderWidth: "0px",
                        boxShadow: "0 0 0 0",
                      }}
                    >
                      <CartModal />
                    </Badge>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div></div>
        </div>
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
  };
})(withRouter(Header));
export default NewVM;
