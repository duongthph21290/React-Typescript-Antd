import { Button, Form, Input, Select } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Iproduct } from '../../types/products';
const { Option } = Select;

interface Idata{
    products: Iproduct[];
    onUpdate: (_id: number) => void;
    id: Iproduct[];
}

const UpdateProductPage = (props: Iproduct) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Lấy danh sách CategoriesId từ API
        axios.get('http://localhost:8080/api/categories')
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => {
                // console.log(error);
            });

        // Lấy thông tin sản phẩm cần cập nhật từ API và hiển thị lên form
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(({ data }) => {
                const data1 = {
                    name: data.name,
                    des: data.des,
                    author: data.author,
                    price: data.price,
                    categoryId: data.categoryId._id
                }
                form.setFieldsValue(data1);
            })
            .catch((error) => {
                // console.log(error);
            });
    }, []);

    const onFinish = (data: Idata) => {
        const test = { _id: id, ...data }
        props.onUpdate(test);
        navigate('/admin/products');
        message.success('Cập nhật sản phẩm thành công!', 2);
    }

    return (
        <div>
            <h1 style={{ marginTop: 20, marginBottom: 40, marginLeft: 230 }}>Update New Products</h1>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                style={{
                    maxWidth: 800,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Cập nhật tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Please input your products!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Cập nhật mô tả sản phẩm"
                    name="des"
                    rules={[{ required: true, message: 'Please input your description!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cập nhật tác giả sản phẩm"
                    name="author"
                    rules={[{ required: true, message: 'Please input author name!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Cập nhật giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: 'Please input product price!' },
                    { whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Cập nhật danh mục sản phẩm"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please select a category!' },
                    { whitespace: true }]}
                >
                    <Select>
                        {categories.map((category: Iproduct) => (
                            <Option key={category._id} value={category._id}>{category.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateProductPage;