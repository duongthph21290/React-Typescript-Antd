import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import {
    AliwangwangOutlined,
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';


const UserList = ['Admin', 'Dương', 'Website', 'ReactJS'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`/admin`}>Home Admin</Link>, 'sub1', <UserOutlined />),
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`category/add`}>Thêm danh mục </Link>, '1', <FileOutlined />),
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`category`}>List danh mục </Link>, '2', <AliwangwangOutlined />),
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`products/add`}>Thêm sản phẩm</Link>, '3', <PieChartOutlined />),
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`products`}>List sản phẩm</Link>, '4', <DesktopOutlined />),
    getItem(<Link style={{ textDecorationLine: 'none' }} to={`/`}>Trang chủ </Link>, '5', <HomeOutlined />),


];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
};



const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap] = useState(GapList[0]);
    const changeUser = () => {
        const index = UserList.indexOf(user);
        setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
        setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
    };

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 35, margin: 16 }} >
                        <div>
                            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large" gap={gap}>
                                {user}
                            </Avatar>
                            <Button
                                size="small"
                                style={{ margin: '0 15px', verticalAlign: 'middle' }}
                                onClick={changeUser}
                            >
                                ChangeUser
                            </Button>
                        </div>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Trần Hải Dương PH21290 Assignment</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminLayout