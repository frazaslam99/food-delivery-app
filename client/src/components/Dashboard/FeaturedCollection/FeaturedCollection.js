import React from "react";
import "./css/FeaturedCollection.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import store from "../../../store/store";
import { connect } from "react-redux";
import { Url } from "../../../Endpoint/index";
class FeaturedCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saphonaSubCats: [],
      auraSubCats: [],
      subcats: [],
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
        console.log("Dataaaa", data);
        store.dispatch({
          type: "SUB_CAT_D",
          payload: data,
        });
      });
  }
  componentWillReceiveProps = (nextP, prevS) => {
    console.log("checkProps", nextP);
    let subCats = nextP.subCats.map((item) => {
      console.log("checkItem", item);
      return item;
    });
    console.log("subcats", subCats);
    this.setState({
      subcats: subCats,
    });
    // let saphonacat = nextP.subCats
    //   .filter((item) => {
    //     return item.maincategory == "Saphona";
    //   })
    //   .map((item) => {
    //     console.log("subcatItem", item);
    //     return item;
    //   });
    // console.log("cattttttttttt", saphonacat);
    // this.setState({
    //   saphonaSubCats: saphonacat,
    // });

    // // for aura

    // let auraCat = nextP.subCats
    //   .filter((item) => {
    //     return item.maincategory == "Aura";
    //   })
    //   .map((item) => {
    //     return item;
    //   });
    // console.log("auraaaaaaa", auraCat);
    // this.setState({
    //   auraSubCats: auraCat,
    // });
  };
  render() {
    return (
      <div className="FC_Most_Main_Div">
        <div className="heading">Featured Collections</div>
        <hr className="line-break" />
        <div className="Featured_collect_main_div">
          <Row style={{ justifyContent: "center" }}>
            {this.state.subcats.map((item) => {
              console.log("itemmmm", item);
              return (
                <Col
                  md="4"
                  xs="12"
                  sm="12"
                  className="Men_Column col-1"
                  style={{
                    paddingTop: "30px",
                    display: this.state.subcats[0] ? "block" : "none",
                  }}
                >
                  <Link
                    to={`/catelog/Menu/${item.subCateg && item.subCateg}`}
                  >
                    <div
                      className="backgroundimage image-1"
                      style={{
                        backgroundImage: `url(${item.file && Url + item.file})`,
                      }}
                    ></div>
                    <div
                      style={{ padding: "22px 20px", backgroundColor: "white" }}
                    >
                      <div className="inner">
                        {item.subCateg && item.subCateg}
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#282828",
                          fontFamily:
                            "Montserrat,Helvetica Neue,Verdana,Arial,sans-serif",
                        }}
                      >
                        Shop Now
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}



          </Row>
        </div>
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
  };
})(FeaturedCollection);
export default NewVM;
