import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Url } from "../../../Endpoint/index";
import store from "../../../store/store";
import { connect } from "react-redux";

class NormalLoginForm extends React.Component {
  componentDidMount = () => {
    
    if (this.props.isAuthenticated == true) {
      // return <Redirect to="/adminpanel" />;
      this.props.history.push("/adminpanel");
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isAuthenticated == true) {
      //     // return <Redirect to="/adminpanel" />;
      this.props.history.push("/adminpanel");
      //   }
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  adminSignin = (event) => {
    
    event.preventDefault();
    // store.dispatch({
    //   type: "USER_LOGIN_STARTED",
    // });
    fetch(Url + "/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((resp) => {
      // store.dispatch({
      //   type: "USER_LOGIN_DONE"
      // });
      resp.json().then((data) => {
       
        if (data.token) {
          localStorage.setItem("token", data.token);
          store.dispatch({
            type: "ADMIN_LOGIN",
            payload: data.token,
          });
        }
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row
        type="flex"
        justify="center"
        style={{
          paddingTop: "80px",
          height: "100vh",
          alignItems: "center",
          backgroundImage: `url(https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Col span={6}>
          <div
            style={{
              paddingBottom: "30px",
              fontWeight: "600",
              fontSize: "20px",
              fontFamily: "Raleway",
            }}
          >
            Enter Your Email And Password To Login To your Pocket Mart Admin Panel
          </div>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            // style={{
            //   maxWidth: "50vw",
            // }}
          >
            <Form.Item>
              {getFieldDecorator("Email", {
                rules: [
                  { required: true, message: "Please input your Email!" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  name="Email"
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  name="Password"
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a
                className="login-form-forgot"
                href=""
                style={{
                  float: "right",
                }}
              >
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.adminSignin}
                style={{
                  width: "100%",
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
// const mapStateToProps = state => ({
//   isAuthenticated: state.adminReducer.isAuthenticated
// })
let ADMIN = connect(function (store) {
  return {
    isAuthenticated: store.adminReducer.isAuthenticated,
  };
})(WrappedNormalLoginForm);
export default ADMIN;
