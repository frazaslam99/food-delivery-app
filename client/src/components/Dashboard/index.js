import React from "react";
import { Route } from "react-router-dom";
import FrontCrousel from "./FrontCrousel/frontcrousel";
import Introduction from "./Introduction/indroduction";
import FeaturedCollection from "./FeaturedCollection/FeaturedCollection";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import NewsLetter from "./Newsletter/newsletter";
import FeaturedProductsDetail from "./FeaturedProductsDetail/FeaturedProductsDetail";
import PolicyDetails from "./Policy Details/Policy-Details";
import Footer2 from "./Footer2/footer";
import AdminLogin from "../Account/Admin-login/admin-login";
import AdminPanel from "../Account/Admin-Panel/adminpanel";
import Header from "../Dashboard/Header/header";
import Checkout from "../Dashboard/Checkout/index";
import AboutUs from "../Dashboard/AboutUs/index";
import ContactUs from "../Dashboard/ContactUs/index";
import newSubCatProducts from "./showSubCatProductsNew/index";
import NewSubCatDetails from "./showSubCatNewProductDetails/FeaturedProductsDetail";
import PrivacyPolicy from "./Policy Details/privacypolicy"

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <Route
          exact
          path="/"
          render={() => {
            return (
              <React.Fragment>
                <FrontCrousel />
                <Introduction />
                <FeaturedCollection />
                <FeaturedProducts />
                <NewsLetter />
                <PolicyDetails />
              </React.Fragment>
            );
          }}
        />

        <Route
          exact
          path="/Catelog/:maincategory/:subCateg"
          component={newSubCatProducts}
        />
        <Route
          path="/Catelog/:maincategory/:subcategory/productdetails/:id"
          component={NewSubCatDetails}
        />

        <Route
          path="/FeaturedProductsDetail/:pid"
          component={FeaturedProductsDetail}
        />

        <Route path="/admin-saphona" component={AdminLogin} />
        <Route path="/adminpanel" component={AdminPanel} />

        <Route path="/checkout" component={Checkout} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />



        <Footer2 />
      </div>
    );
  }
}

export default Dashboard;
