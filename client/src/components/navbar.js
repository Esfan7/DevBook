import React from 'react';
import { CodeOutlined, LoginOutlined, UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
    {
      label: 'DevBook',
      key: 'index',
      icon: <CodeOutlined />,
    },
    {
        label: 'Search Bar Placeholder',
        key: 'search',
        icon: <SearchOutlined />
    },
    {
        label: 'Profile',
        key: 'profile',
        icon: <UserOutlined />,
    },
    {
        label: 'Login',
        key: 'login',
        icon: <LoginOutlined />,
    },
    {
        label: 'Messages',
        key: 'messages',
        icon: <MailOutlined />
    }
];

const App = () => {
    const [current, setCurrent] = useState('index');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
  };
  export default App;