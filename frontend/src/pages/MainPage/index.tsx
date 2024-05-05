import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined, SmileOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';

const { Header, Sider, Content } = Layout;
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GetUserList } from "../../services/accounts";

const MainPage = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const MenuItems = [
    {
      key: 'home',
      label: <Link to='/'>首页</Link> ,
    },
    {
      key: 'settings',
      label: '设置',
      children: [
        {
          key: 'profile',
          label: <Link to='profile'>个人设置</Link> ,
        }
      ]
    }
  ]

  const dropDownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to='profile'>个人设置</Link> ,
    },
    {
      key: 'logout',
      label: '退出',
    },
  ];


  return (
    <Layout style={{height: '100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={MenuItems}
        />
      </Sider>
      <Layout>
        <Header style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 0,
          background: colorBgContainer
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ paddingRight: 20}}>
            <Dropdown menu={{ items: dropDownItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  { localStorage.getItem('username') }
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default MainPage;
