import React from 'react';

import { Button, Modal, Form, Input, Radio } from 'antd';
import { getDefaultWatermarks } from 'istanbul-lib-report';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class SignupButton extends React.Component {
    // state = {
    //   Username: '',
    //   Password: '',
    //   Email: '',
    //   PhoneNo: '',
    //   City:'',
    //   Address:'',
    //   Gender:'',
    // };
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    onSignup = (evt) => {
   
      // debugger;
      evt.preventDefault();
      fetch('/signup', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then((resp) => {
        // store.dispatch({
        //   type: "UserSignUp",
        //   payload: this.state,
        // });
        if (resp) {
  
          this.props.history.push('/')
        }
      });
     
  }
    render() {
      const { visible, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="SIGNUP"
          okText="SIGNUP"
          onCancel={onCancel}
          onOk={this.onSignup}
        >
          <Form layout="vertical">
            <Form.Item label="Username" >
              {getFieldDecorator('Username', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='Username' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item label="Email" >
              {getFieldDecorator('Email', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='Email' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item label="Password" >
              {getFieldDecorator('Password', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='Password' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item label="Phone No" >
              {getFieldDecorator('Phone No', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='PhoneNo' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item label="City" >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='City' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item label="Address" >
              {getFieldDecorator('Adress', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input name='Address' onChange={this.handleChange}/>)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item" name='Gender' onChange={this.handleChange}>
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class SignupButton extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };
 
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Signup
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default SignupButton;