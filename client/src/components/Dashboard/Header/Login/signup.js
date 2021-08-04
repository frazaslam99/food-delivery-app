import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import store from '../../../../store/store';
import { Button, message } from "antd";
const key = "updatable";


const Signupmsg = () => {
    message.loading({ content: "Loading...", key });
    setTimeout(() => {
        message.success({ content: "Successfully Sign up!", key, duration: 2 });
    }, 1000);
};



class FormDataComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            array: []
        }

        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePhone = this.onChangePhone.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);



    }



    // Form Events
    onChangeName = (e) => {
        this.setState({ name: e.target.value })

    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })


    }

    onChangePhone = (e) => {
        this.setState({ phone: e.target.value })




    }


    onSubmit = (e) => {
        e.preventDefault()

        // let abc = []
        let data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone

        }

        this.setState({

            email: "",
            phone: "",
            name:""
        })

        // abc.push(data)

        // this.setState({
        //     array: abc
        // })


        // let newVar = [...this.state.array, abc]
        store.dispatch({
            type: "SIGNUP",
            payload: data,
        });

        Signupmsg();


    }

    // React Life Cycle
    componentDidMount() {
        console.log("props", this.props)
    }
    render() {
        return (
            <div className="container">
                <form >
                    <div className="form-group">
                        <label style={{ color: "black" }}>Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: "black" }}>Email</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: "black" }}>Password</label>
                        <input type="password" className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                    </div>

                    {this.state.email !== "" &&
                        this.state.phone !== "" &&
                        this.state.name !== "" ? (
                        <input
                            className="btn  btn-block" style={{ backgroundColor: "gray", color: "white" }}
                            type="submit"
                            value="SUBMIT"
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

                    {/* <button type="submit" className="btn  btn-block" style={{ backgroundColor: "gray", color: "white" }} onClick={this.onSubmit} >Submit</button> */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        arrayData: store.cartReducer.arrayData,

    };
};

export default connect(mapStateToProps)(FormDataComponent);