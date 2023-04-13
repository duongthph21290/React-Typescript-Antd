import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Iproduct } from '../types/products';



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  const onFinish = (values: Iproduct) => {
    axios.post('http://localhost:8080/api/signin/', values)
      .then((response) => {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        //Lưu access token vào localstorage
        localStorage.setItem('accessToken', response.data.accessToken);
        setCurrentUser(response.data.user); // Cập nhật state của người dùng
        if (response.data.user.role === 'admin') {
          message.success('Chào mừng Admin đã quay trở lại!', 2);
          navigate('/admin');
        } else {
          message.success('Chúc mừng bạn đã đăng nhập thành công!', 2);
          navigate('/');
        }
      })
      .catch((error) => {
        // console.log(error);
        message.error('Đăng nhập thất bại!', 2);
      });
  };
  // Một hàm xử lý khi form đăng nhập hoặc đăng ký thất bại
  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo); // nhận vào tham số errorInfo là một đối tượng chứa thông tin về lỗi
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
        <h1 style={{ marginLeft: 240, marginTop: 20, marginBottom: 30 }}>Đăng nhập</h1>
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

}


export default Login;