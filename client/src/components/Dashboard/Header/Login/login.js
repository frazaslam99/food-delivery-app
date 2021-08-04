import React, { Component } from 'react';
import store from '../../../../store/store';
import { Button, message } from "antd";
const key = "updatable";


const Loginmsg = () => {
    message.loading({ content: "Loading...", key });
    setTimeout(() => {
        message.success({ content: "Successfully Sign up!", key, duration: 2 });
    }, 1000);
};

export default class FormDataComponent extends Component {

    userData;

    constructor(props) {
        super(props);

        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePhone = this.onChangePhone.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            email: '',
            password: ''
        }
    }



    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePhone = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        let data = {

            email: this.state.email,
            password: this.state.password

        }

        store.dispatch({
            type: "LOGIN",
            payload: data,
        });

        this.setState({

            email: "",
            password: ""
        })
        Loginmsg();
    }

    // React Life Cycle
    componentDidMount() {
        // this.userData = JSON.parse(localStorage.getItem('user'));

        // if (localStorage.getItem('user')) {
        //     this.setState({
        //         name: this.userData.name,
        //         email: this.userData.email,
        //         phone: this.userData.phone
        //     })
        // } else {
        //     this.setState({
        //         name: '',
        //         email: '',
        //         phone: ''
        //     })
        // }
    }

    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem('user', JSON.stringify(nextState));
    // }


    render() {
        return (
            <div className="container">
                <form >

                    <div className="form-group">
                        <label style={{ color: "black" }}>Email</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required />
                    </div>
                    <div className="form-group">
                        <label style={{ color: "black" }}>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePhone} required />
                    </div>
                    {this.state.email !== "" &&
                        this.state.password !== "" ? (
                        <input
                            className="btn  btn-block" style={{ backgroundColor: "gray", color: "white" }}
                            type="submit"
                            value="LOGIN"
                            onClick={this.onSubmit}
                        />
                    ) : (
                        <input
                            className="btn  btn-block" style={{ backgroundColor: "gray", color: "white" }}
                            type="submit"
                            value="Please Fill All The Fields"
                           
                            disabled={true}
                        />
                    )}
                    {/* <button type="submit" className="btn btn-block" style={{ backgroundColor: "gray", color: "white" }} onClick={this.onSubmit}>Submit</button> */}
                </form>
            </div>
        )
    }
}