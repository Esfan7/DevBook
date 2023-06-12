import React from 'react';
import { CodeOutlined, LoginOutlined, UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import  SearchBar   from './searchBar';
import { useNavigate } from 'react-router-dom';
const items = [
    {
      label: 'DevBook',
      key: 'index',
      icon: <CodeOutlined />,
    },
    {
        label: <SearchBar />,
        key: 'search',
        icon: <SearchOutlined />
    },
    {
        label: 'Profile',
        key: '/profile',
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

const Navbar2 = () => {
    const [current, setCurrent] = useState('index');
    //const navigate = useNavigate();
    const onClick = (e) => {
      console.log('click ', e);
       // navigate(e.key)
      setCurrent(e.key);
    };
    return ( 
        // <div style={{height:'100vh', backgroundColor:'rgb(119, 124, 124)'}}>
        //     <Menu style={{backgroundColor:'rgb(119, 124, 124)'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
        // </div>
        // <div className='w-full m-2 border-b-8 py-1 my-4' >
        // <Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <div style={{height:'10vh', backgroundColor:'rgb(119, 124, 124)'}}>
            <Menu style={{backgroundColor:'rgb(119, 124, 124)'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    );
};
  export default Navbar2;