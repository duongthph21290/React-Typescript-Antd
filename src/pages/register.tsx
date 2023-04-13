import React from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Iproduct } from '../types/products';



const Register: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: Iproduct) => {
        try {
            const response = await axios.post('http://localhost:8080/api/signup', values);
            message.success('Đăng kí thành công, xin mời đăng nhập!', 4); // thông tin tài khoản đã được đăng kí thành công
            navigate('/login');
        } catch (error) {
            message.error('Đăng kí thất bại', 2);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 800,
                    textAlign: "center",
                    marginLeft: 210
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <h1 style={{ marginLeft: 240, marginTop: 20, marginBottom: 30 }}>Đăng kí tài khoản</h1>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' },
                    { whitespace: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={[{ required: true, message: 'Please input your confirmpassword!' },
                    { whitespace: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Register;