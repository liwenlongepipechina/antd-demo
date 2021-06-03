import React,{ Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    MailOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons';
import './index.scss';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu; 
class LayoutContainer extends Component{
    state = {
        collapsed: false,
        current: 'home',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick = (e) => {
        console.log('click ', e);
        console.log(`/${e.key}`);
        this.setState({
            current: e.key,
        },()=>{
            this.props.history.replace(`/${e.key}`);
        });
    }

    render (){
        const { route } = this.props;
        return (
            <HashRouter>
                <Layout className="layout-all">
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="home" icon={<UserOutlined />}>
                                nav 1
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                                <Menu.Item key="user">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {
                                this.state.collapsed ? 
                                <MenuUnfoldOutlined className="trigger" onClick={this.toggle}/> 
                                : <MenuFoldOutlined className="trigger" onClick={this.toggle}/>
                            }
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            }}
                        >
                            <div className="layout-content--info">
                                {renderRoutes(route.routes)}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }
}

export default LayoutContainer;