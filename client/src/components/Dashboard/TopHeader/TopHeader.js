import React from 'react';
import './css/topheader.css';
import { FaFacebookF } from 'react-icons/fa';
import UserIcon from './icons/userIcon.png'
import FbIcon from './icons/fbIcon.png'
import CartIcon from './icons/cartIcon.png'
import { Menu, Dropdown, Icon } from 'antd';
import SignupButton from '../../Account/Signup/Signup Button/signupButton'
import LoginButton from '../../Account/Login/Login Button/LoginButton';
import { Modal, Button } from 'antd';
import { Container, Row, Col } from 'reactstrap';


const menu = (
    <Menu>
        <Menu.Item>
            <SignupButton />
        </Menu.Item>
        <Menu.Item>
            <LoginButton />
        </Menu.Item>

    </Menu>
)

class TopHeader extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div style={{
                position: 'sticky', top: '0', zIndex: '1000'
            }}>
                <div className='main_div_topheader'>



                    <div>

                        <Modal
                            title="YOUR CART"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <div className='Cart_main_div'>
                                <Row>
                                    <Col xs='7'>image + title </Col>
                                    <Col xs='2'>+ 1 -</Col>
                                    <Col xs='2'>Price</Col>
                                    <Col xs='1'>X</Col>
                                </Row>
                            </div>
                        </Modal>
                    </div>



                    <div className='data_div_topheader'>
                        UNIQUELY CATERING TO YOUR EVERY NEED
                       </div>
                    <div className='topheader_User_icons_div'>
                        <Dropdown overlay={menu}>
                            <span>
                                <img src={UserIcon} />
                                {/* <a className="ant-dropdown-link" href="#"> */}

                                <Icon type="down" />
                            </span>
                            {/* </a> */}
                        </Dropdown>
                    </div>
                    <div className='topheader_Fb_icons_div'>
                        <img src={FbIcon} />
                    </div>
                    <div className='topheader_Cart_icons_div'>
                        <img src={CartIcon} onClick={this.showModal} />
                    </div>
                </div>

            </div>
        )
    }
}


export default TopHeader;