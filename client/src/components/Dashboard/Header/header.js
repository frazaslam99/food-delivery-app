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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LoginForm from "./Login/tab"
import { Button, message } from "antd";
const key = "updatable";


const Loginwrongmsg = () => {
    message.loading({ content: "Loading...", key });
    setTimeout(() => {
        message.warning({ content: "Incorrect Email && password!", key, duration: 2 });
    }, 1000);
};


const style = {
  link: { backgroundColor: "transparent", fontSize: "15px" },
  heading: {
    fontFamily: "times new roman",
    fontWeight: 700,
    fontSize: "35px",
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
        return item.maincategory == "Menu";
      })
      .map((item) => {
        // console.log("sapItem", item);
        return item;
      });
    // console.log("cattttttttttt", saphonacat);
    this.setState({
      saphonaSubCats: saphonacat,
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

  logout = () => {
    store.dispatch({
      type: "LOGOUT",
      payload: {},
    });
  }
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
          // position: this.state.bgPosition,
          zIndex: 10,
          top: 0,
          position:"sticky",
          backgroundColor: "grey",
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
                  <div style={{ paddingTop: "0px" }}>
                    {/* <img src={Logo} className="siteLogo_saphona" /> */}
                    &nbsp; &nbsp;
                    <h1 style={{ color: "white", ...style.heading, fontSize: "23px" }}>Pocket Mart</h1>
                  </div>
                </Link>
              </div>
            </Col>

            <Col span={12}>
              <div className="headerRight">
                <ul style={{ listStyle: "none" }} className="ul">
                  <li className="listitem responsive" >

                    <div class="dropdown">
                      {console.log("check", this.props.loginData.email === this.props.arrayData.email)}

                      {this.props.loginData &&
                        this.props.loginData.email !== this.props.arrayData.email && this.props.loginData.password !== this.props.arrayData.phone ?
                        < button >
                          <PermIdentityIcon />
                        </button>
                        :
                        <span style={{ color: "white",fontSize:"15px",textTransform:"uppercase" }}>{ this.props.arrayData.name}</span>
                       
                      }


                      <div class="dropdown-content" style={{minHeight:0}}>
                        <div className="drop-inner">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            {this.props.loginData &&

                              this.props.loginData.email !== this.props.arrayData.email && this.props.loginData.password !== this.props.arrayData.phone ?
                            
                              <Link>
                                <LoginForm />               
                              </Link>
                             
                            

                             

                              :

                              <button onClick={this.logout} style={{width:"100px",height:"50px",backgroundColor:"grey",color:"white",fontSize:"18px"}}>Logout</button>
                            }


                            
                          </div>

                        </div>
                      </div>

                    </div>


                  </li>

                  {/* </div> */}




                  <li className="listitem responsive">
                    <Link
                      to="/"
                      style={{ color: "white", ...style.link }}
                    >
                      HOME
                    </Link>
                  </li>

                  <li className="listitem responsive">
                    <div class="dropdown">
                      <span className="dropbtn" style={{ color: "white" }}>Menu</span>
                      <i class="fa fa-caret-down" style={{ color: "white", marginLeft: "5px" }}></i>
                      <div class="dropdown-content" style={{ minHeight: 0 }}>
                        <div className="drop-inner">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "150px",
                              height: "auto",
                              backgroundColor: "#9b9696"
                            }}
                          >
                            {this.state.saphonaSubCats.map((item, index) => {
                              return (
                                <Link
                                  to={`/catelog/${item.maincategory}/${item.subCateg}`}
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
                                        item.maincategory,
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

                        </div>
                      </div>

                    </div>
                  </li>


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
      </div >
    );
  }
}
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
    arrayData: store.cartReducer.arrayData,
    loginData: store.cartReducer.loginData
  };
})(withRouter(Header));
export default NewVM;
