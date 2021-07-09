import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { Button } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Row, Col } from "reactstrap";
import { Url } from "../../../../Endpoint/index";
import Header2 from '../../../Dashboard/Header/header2'
import "./css/manageOrders.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    fetch(Url + "/getOrderedProducts", {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setProductDetails(data);
        //   store.dispatch({
        //     type: "SHOW_ORDERED_PRODUCTS",
        //     payload: data
        //   });
      });
  }, []);
  // const completeOrder = (event, productDetails) => {
   
  //   fetch(Url + "/completeOrder", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ productDetails }),
  //   }).then((resp) => {
  //     console.log("order Completed Successfully");
  //   });
  // };
  return (
    <div className={classes.root}>
     
      {!productDetails.length > 0 ? (
        <div
          style={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>NO ORDER DISPATCHED YET </h3>
        </div>
      ) : (
        productDetails
          .filter((item) => {
            return item.status == "Completed";
          })
          .map((item, index) => {
            return (
              <ExpansionPanel
                expanded={expanded === index + 1}
                onChange={handleChange(index + 1)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    Order No : {index + 1}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    Check Order Details
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <Container>
                      <div style={{ paddingTop: "2%" }}>
                        {/* <div>
                        <h4 style={{ display: "inline-block" }}>
                          Product Details :
                        </h4>
                        <span style={{ float: "right" }}>
                          <Button
                            color="info"
                            onClick={(event) =>
                              completeOrder(event, productDetails)
                            }
                          >
                            Dispatch Order
                          </Button>
                        </span>
                      </div> */}
                        <table id="customers">
                          <tr>
                            <th>Product title</th>
                            <th>Product description</th>
                            <th>Product price</th>
                            <th>Product quantity</th>
                            <th>Product Image</th>
                          </tr>

                          {item.cartNewItems.map((item) => {
                            return (
                              <tr>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.amount}</td>
                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={Url +
                                        "/subcatuploads/" +
                                        item.file[0].filename}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>

                      <div style={{ paddingTop: "2%" }}>
                        <div>
                          <h4>Customer Details :</h4>
                        </div>
                        <table id="customers">
                          <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Address</th>
                          </tr>
                          <tr>
                            <td>{item.firstName + item.lastName}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.address}</td>
                          </tr>
                        </table>
                      </div>
                    </Container>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
      )}
    </div>
  );
}
