import React, { Component } from "react";
import { Drawer, Button, Divider } from "antd";
import { MdMenu } from "react-icons/md";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../../../store/store";
import { Url } from "../../../../Endpoint/index";

import "./drawer.css";
class MenuDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      saphonaSubCats: [],
      auraSubCats: [],
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
      showDroprDown: false,
      showAuraMblDpdwn: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    fetch(Url + "/getSubCatD", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Dataaaa", data);
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
        return item.subCateg;
      });
    console.log("cattttttttttt", saphonacat);
    this.setState({
      saphonaSubCats: saphonacat,
    });

    // for aura

    let auraCat = nextP.subCats
      .filter((item) => {
        return item.maincategory == "Aura";
      })
      .map((item) => {
        return item.subCateg;
      });
    console.log("auraaaaaaa", auraCat);
    this.setState({
      auraSubCats: auraCat,
    });
  };

  sendReqToGetProduct = (event, maincategory, subCategory) => {
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
    this.onClose();
  };

  render() {
    return (
      <div className="header-drawer">
        <MdMenu
          color={this.props.color}
          size={30}
          style={{ cursor: "pointer",color:"white" }}
          onClick={this.showDrawer}
        />

        <Drawer
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p
            style={{ color: "white", cursor: "pointer" }}
            // onClick={() => {
            //   this.setState({
            //     showDroprDown: !this.state.showDroprDown,
            //   });
            // }}
          >
              <Link
                      to="/"
                      // onClick={()=>this.onBgColorChange('static')}
                      // style={{ color: color, ...style.link }}
                    >

                   
            Home
            </Link>
            {/* <span style={{ float: "right " }}>
        
            
            </span> */}
          </p>
         
         
          <Divider />
          {/* <p
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              this.setState({
                showDroprDown: !this.state.showDroprDown,
              });
            }}
          >
            Menu
            <span style={{ float: "right " }}>
            <img src={require("./images/down-arrow.png")} />
              
            </span>
          </p>
          {this.state.saphonaSubCats.map((item) => {
            return (
              <p hidden={this.state.showDroprDown == false}>
                <Link
                  to={`/catelog/${item.maincategory}/${item.subCateg}`}
                  style={{ color: "lightGrey" }}
                >
                  <span
                    onClick={(event) =>
                      this.sendReqToGetProduct(event, 
                        item.maincategory,
                         item.subCateg
                      )
                    }
                  >
                   {item.subCateg}
                  </span>
                </Link>
              </p>
            );
          })}
           */}

           <div class="dropdown">
                      <span className="dropbtn" style={{ color: "white" }}>Menu</span>
                      <i class="fa fa-caret-down" style={{ color: "white", marginLeft: "5px" }}></i>
                      <div class="dropdown-content" style={{ minHeight: 0,color:"white" }}>
                        <div className="drop-inner">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "150px",
                              height: "auto",
                              backgroundColor: "#9b9696",
                              color:"white"
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



          
        
          <Divider />
        </Drawer>
      </div>
    );
  }
}
// export default MenuDrawer;
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
  };
})(withRouter(MenuDrawer));
export default NewVM;
