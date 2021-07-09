import React from "react";
import "./css/AddFeatureProduct.css";
import { Url } from "../../../../Endpoint/index";
class AddFeatureProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "",
      description: "",
      title: "",
      image: [],
      saleprice: "",
      files: [],
      img: ""
    };
  }
  handleChange = ({ fileList }) => this.setState({ fileList });
  handleimg = event => {
    this.setState({ image: [...this.state.image, ...event.target.files] });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  saveData = event => {
    event.preventDefault();
    let formdata = new FormData();
    this.state.image.map(item => {
      formdata.append("files", item);
    });
    formdata.append("title", this.state.title);
    formdata.append("description", this.state.description);
    formdata.append("price", this.state.price);
    formdata.append("saleprice", this.state.saleprice);
    fetch(Url + "/sliderUploads", {
      method: "POST",
      body: formdata
    }).then(resp => {
      if (resp) {
        this.setState({
          price: "",
          description: "",
          title: "",
          saleprice: ""
        });
        document.getElementById("myForm").reset();
      }
    });
  };
  render() {
    return (
      <div>
        <div className="FP_upload_main_div">
          <div className="FP_title_div">
            <h3 className="Crousel_img_upload_title">
              Please Uplaod A Feature Product
            </h3>
          </div>

          <div className="FP_uplaod_description_price_div">
            <form id="myForm">
              <label for="EnterDesc">Enter Title</label>
              <input
                type="text"
                id="ftitle"
                name="title"
                placeholder="Enter Title.."
                onChange={this.handleChange}
              />
              <label for="lname">Enter Description</label>
              <input
                type="text"
                id="fdesc"
                name="description"
                placeholder="Enter Description.."
                onChange={this.handleChange}
              />
              <label for="lname">Enter Price</label>
              <input
                type="text"
                id="fprice"
                name="price"
                placeholder="Enter Price.."
                onChange={this.handleChange}
              />
              <label for="lname">Enter SalePrice</label>
              <input
                type="text"
                id="fsaleprice"
                name="saleprice"
                placeholder="Enter SalePrice.."
                onChange={this.handleChange}
              />
              <input
                type="file"
                name="files"
                id="myFile"
                onChange={this.handleimg}
                multiple
              />

              <input type="submit" value="Submit" onClick={this.saveData} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddFeatureProduct;
