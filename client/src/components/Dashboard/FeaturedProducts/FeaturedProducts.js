import React from "react";
import Slider from "react-slick";
import "./css/FeaturedProducts.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../../store/store";
import { Container, Row, Col } from "reactstrap";
import { Button, message } from "antd";
import { Url } from "../../../Endpoint/index";

class FeaturedProducts extends React.Component {
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
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
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
        <div className="heading">Featured Products</div>
        <hr className="line-break" />
        <Container>
          <Row>
            <div
              className="Fture_pd_main_div"
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "20px 0px 60px 20px",
              }}
            >
              {this.props.nsps.map((item) => {
                console.log("nsps",item)
                return (
                  <div className="FCD_product_div">
                    <Link to={`/FeaturedProductsDetail/${item.description}`}>
                      <div
                        className="fp_bg_img_div"
                        style={{
                          width: "330px",
                          height: "400px",
                          backgroundImage: `url(${
                            Url + "/subcatuploads/" + item.files[0].filename
                          }`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </Link>
                    <div className="slider_title_price_div">
                      {item.title}--{item.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    nsps: store.imgReducer.sliderProduct,
  };
})(FeaturedProducts);
export default NewVM;
