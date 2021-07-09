import React from "react";
import "./css/cssfile.css";
import { Url } from "../../../../Endpoint/index";

class AddSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCateg: "",
      maincategory: "",
      image: "",
    };
  }

  handleChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelectForMain = (event) => {
    this.setState({ maincategory: event.target.value });
  };
  saveData = (event) => {
    event.preventDefault();

    let formdata = new FormData();
    formdata.append("file", this.state.image);
    formdata.append("maincategory", this.state.maincategory);
    formdata.append("subCateg", this.state.subCateg);

    // let data = {
    //   maincategory: this.state.maincategory,
    //   subCateg: this.state.subCateg,
    // };

    fetch(Url + "/createSubCat", {
      method: "POST",

      body: formdata,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          this.setState({
            subCateg: "",
            maincategory: "",
          });
        }
      });
  };

  render() {
    return (
      <div className="addSubCat_most_main_div">
        <div>
          <div className="title_main_div">
            <h3 className="title_subDiv">Please Select SubCategory</h3>
          </div>
          <div className="form_main_div">
            <form id="Form">
              <label for="lname">Select Category</label>

              <select
                className="lebelBox"
                value={this.state.maincategory}
                onChange={this.handleSelectForMain}
              >
                <option>Select Category</option>
                <option value="Menu">Menu</option>

              </select>
              <label className="SubCat" for="EnterSubCAt">
                Enter SubCategory
              </label>
              <input
                type="text"
                id="SubCat"
                name="subCateg"
                placeholder="Enter SubCategory Name"
                onChange={this.handleChange}
                value={this.state.subCateg}
              />
              <input
                type="file"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
              <input type="submit" value="Submit" onClick={this.saveData} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSubCategory;
