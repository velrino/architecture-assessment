import React, { useState, useEffect } from "react";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";

export function Main() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            {/* <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <Menu.Item key="3">Services</Menu.Item>
                    <Menu.Item key="4">Contact</Menu.Item>
                </Menu>
            </Layout.Sider> */}
            <Layout className="site-layout">
                {/* <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
                    <Button
                        className="responsive-menu"
                        type="primary"
                        onClick={toggle}
                        style={{ marginBottom: 16 }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                </Layout.Header> */}
                <Layout>
                    <Layout.Content className="content">
                        <Outlet  />
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    );

}