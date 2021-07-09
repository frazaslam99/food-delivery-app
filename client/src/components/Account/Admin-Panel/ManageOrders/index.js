import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { Button } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Redirect } from "react-router";
import { Container, Row, Col } from "reactstrap";
import { Url } from "../../../../Endpoint/index";
import "./css/manageOrders.css";
import { connect } from "react-redux";
import store from "../../../../store/store";

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

function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);
  const [msgStat, setMsgStat] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    setInterval(() => {
      window.location.href = "/adminpanel";
    }, 1800000);
    fetch(Url + "/getOrderedProducts", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        setProductDetails(data);

        // store.dispatch({
        //   type: "SHOW_ORDERED_PRODUCTS",
        //   payload: data,
        // });
      });
  }, []);
  const updatePro = (event, id) => {
    fetch(Url + "/updateActiveProduct/" + id, {
      method: "PUT",
    })
      .then((data) => data.json())
      .then((data) => {
      
        if (data.success == true) {
          setRedirect(true);
        }
      });
  };
  if (redirect) {
    return <Redirect to="/adminpanel" />;
  }

  const updateStatus = (event, id) => {
    fetch(Url + "/updateMsgStatus/" + id, {
      method: "PUT",
    })
      .then((data) => data.json())
      .then((data) => {
      
        if (data.success == true) {
          setMsgStat(true);
        }
      });
  };
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
          <h3>NO ORDERS YET </h3>
        </div>
      ) : (
        productDetails
          .filter((item) => {
            return item.status == "Active";
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
                    <div>
                      <div>Order No : {index + 1}</div>
                      <div hidden={item.msgStatus == "UNREAD"}>
                        Status : Message Seen
                      </div>
                    </div>
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    <div>
                      <div>Total Amount : {item.totalamount}</div>
                      <div>Click to See Details</div>
                    </div>
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
                        <div>
                          <h4 style={{ display: "inline-block" }}>
                            Product Details :
                          </h4>
                          <span style={{ float: "right" }}>
                            <Button
                              color="info"
                              onClick={(event) => updatePro(event, item._id)}
                            >
                              Dispatch Order
                            </Button>
                          </span>
                          <span style={{ float: "right" }}>
                            {item.msgStatus == "SEEN" || msgStat == true ? (
                              <Button
                                color="info"
                                style={{
                                  marginRight: "10px",
                                }}
                                onClick={(event) =>
                                  updateStatus(event, item._id)
                                }
                                disabled
                              >
                                Message Already Seen
                              </Button>
                            ) : (
                              <Button
                                color="info"
                                style={{
                                  marginRight: "10px",
                                }}
                                onClick={(event) =>
                                  updateStatus(event, item._id)
                                }
                              >
                                Mark as Read
                              </Button>
                            )}
                          </span>
                        </div>
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
                                      src={
                                        Url +
                                        "/subcatuploads/" +
                                        item.file[0].filename
                                      }
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

const mapStateToProps = (store) => ({});
export default connect(mapStateToProps)(ControlledExpansionPanels);
