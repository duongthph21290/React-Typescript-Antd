import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import { Iproduct } from "../../types/products";

//Nhận props từ App.tsx
const AddProductPage = (props: Iproduct) => {
    // Khởi tạo navigate để điều hướng
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, []);
    //Hàm xử lí sự kiện khi submit form
    const onFinish = (data: Iproduct) => {
        //Gọi hàm onAdd từ props truyền vào 
        props.onAdd(data);
        // Điều hướng đến trang chủ /
        navigate('/admin/products');
        message.success('Thêm sản phẩm thành công!', 2);
    }
    return (

        <div > <h1 style={{ marginTop: 20, marginBottom: 40, marginLeft: 200 }}>Add New Products</h1>

            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                style={{
                    maxWidth: 700,

                }}
                onFinish={onFinish}
                autoComplete="off"  >

                <Form.Item
                    label="Nhập tên sản phẩm"
                    name="name"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your products!' },
                    { whitespace: true }]}
                    
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập mô tả sản phẩm"
                    name="des"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your description!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nhập tác giả sản phẩm"
                    name="author"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your author!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nhập giá sản phẩm"
                    name="price"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your price!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    label="Category ID"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please select your category!' },
                    { whitespace: true }]}
                >
                    <Select placeholder="Select a category">
                        {categories.map((category: Iproduct) => (
                            <Select.Option key={category._id} value={category._id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <div style={{ marginLeft: 90 }}>
                        <Button type="primary" htmlType="submit">
                            Add news
                        </Button>
                    </div>

                </Form.Item>
            </Form>
        </div>
    )

}

export default AddProductPage;


