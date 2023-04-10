import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

const AddCategory = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (data) => {
        setLoading(true);
        axios.post('http://localhost:8080/api/categories', data)
            .then(() => {
                setLoading(false);
                navigate('/admin/products/add');
                message.success('Thêm danh mục thành công!', 2);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1 style={{ marginTop: 20, marginBottom: 40, marginLeft: 200 }}>Add New Category</h1>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                style={{
                    maxWidth: 700,

                }}
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <div style={{marginLeft: 120}}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add Category
                        </Button>
                    </div>

                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCategory;
