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
            onClick={() => {
              this.setState({
                showDroprDown: !this.state.showDroprDown,
              });
            }}
          >
            Home
            <span style={{ float: "right " }}>
              
            </span>
          </p>
          {this.state.saphonaSubCats.map((item) => {
            return (
              <p hidden={this.state.showDroprDown == false}>
                <Link
                  to={`/catelog/Menu/${item}`}
                  style={{ color: "lightGrey" }}
                >
                  <span
                    onClick={(event) =>
                      this.sendReqToGetProduct(event, "Saphona", item)
                    }
                  >
                    {item}
                  </span>
                </Link>
              </p>
            );
          })}
          <Divider />
          <p
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              this.setState({
                showAuraMblDpdwn: !this.state.showAuraMblDpdwn,
              });
            }}
          >
            Aura
            <span style={{ float: "right " }}>
              <img src={require("./images/down-arrow.png")} />
            </span>
          </p>
          {this.state.auraSubCats.map((item) => {
            return (
              <p hidden={this.state.showAuraMblDpdwn == false}>
                <Link
                  to={`/catelog/Aura/${item}`}
                  style={{ color: "lightGrey" }}
                >
                  <span
                    onClick={(event) =>
                      this.sendReqToGetProduct(event, "Aura", item)
                    }
                  >
                    {item}
                  </span>
                </Link>
              </p>
            );
          })}
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
