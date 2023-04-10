import React, { useEffect, useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const WebsiteLayout = () => {
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        // Khởi tạo biến user : Dùng localStorage lấy ra currentUser đã lưu 
        const user = localStorage.getItem('currentUser');
        // Check nếu nó user thì, setCurrentUser thành dạng Json rồi render ra màn hình
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    // Sử dụng removeItem để xóa thông tin và accessToken -> set CurrentUser thành 1 mảng rỗng
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        setCurrentUser([]);
    };

    return (
        <div>
            <Layout>
                <Menu
                    mode="horizontal"
                    items={[{ label: <Link style={{ textDecorationLine: 'none' }} to={`/`}><HomeFilled /></Link>, key: 'home' },
                    {
                        label: <Link style={{ textDecorationLine: 'none' }} to={`products`}>Products</Link>,
                        key: 'product', children:
                            [{ label: <Link style={{ textDecorationLine: 'none' }} to={{}}>Product Detail</Link>, key: 'productdetail' }],
                    },
                    {
                        label: <Link style={{ textDecorationLine: 'none' }} to={`/register`}>Register</Link>,
                        key: 'register',
                    },
                    {
                        label: <Link style={{ textDecorationLine: 'none' }} to={`/login`}>Login</Link>,
                        key: 'Login',
                    },
                    // {
                    //     label: <Link style={{ textDecorationLine: 'none' }} to={`/admin`}>ADMIN</Link>,
                    //     key: 'Admin',
                    // },
                    {
                        label: currentUser?.name ? `Xin chào, ${currentUser.name}` : '',
                        key: 'name',
                        style: { marginLeft: 920 },
                    },
                    {
                        label: 'Đăng xuất',
                        key: 'logout',
                        onClick: handleLogout,
                    },
                    ]}
                />
                <Content>
                    <Outlet currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </Content>
                <Footer style={{ height: '60px', backgroundColor: 'black', color: 'white', textAlign: 'center', paddingTop: 20, width: '100%', overflow: 'hidden' }}>
                    Trần Hải Dương PH21290 Assignment
                </Footer>
            </Layout>
        </div>
    );
};

export default WebsiteLayout;
