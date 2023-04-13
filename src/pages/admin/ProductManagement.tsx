import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Iproduct } from '../../types/products';

interface Iprops {
    products: Iproduct[];
    id: Iproduct[];
}
const ProductManagementPage = (props: Iprops) => {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                // console.log(error);
            })
    }, []);

    const data = props.products.map((item: Iproduct, index) => {
        return {
            key: index + 1,
            id: item._id,
            name: item.name,
            des: item.des,
            author: item.author,
            price: item.price,
            categoryId: item.categoryId
        }
    });

    const onHandleRemove = (id: Iproduct) => {
        const isConfirm = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (isConfirm) {
            props.onRemove(id);
        }
    };

    // Tìm kiếm theo tên sản phẩm
    const onSearch = (value: string) => {
        setSearchText(value);
    };

    // Lọc data từ filter 
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const categoryOptions = categories.map(category => {
        return (
            <Select.Option key={category._id} value={category._id}>
                {category.name}
            </Select.Option>
        )
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'CategoryId',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId: Iproduct) => {
                const category = categories.find(cat => cat._id === categoryId);
                return category ? category.name : '';
            },
            filterDropdown: () => (
                <Select defaultValue="" style={{ width: '100%' }}>
                    <Select.Option value="">All Categories</Select.Option>
                    {categoryOptions}
                </Select>
            ),
            // filterIcon là một hàm không trả về gì cả, nó trả về null.Được sử dụng để ẩn biểu tượng lọc mặc định của Ant Design,
            //Đã thay thế nó bằng hàm filterDropdown.
            filterIcon: () => null,
            // là một hàm lọc cho cột "Category". Khi người dùng chọn một danh mục trong Select, 
            // nó sẽ lọc bảng sản phẩm theo danh mục tương ứng. Hàm này so sánh giá trị categoryId trong bản ghi với giá trị được chọn
            //  trong Select và trả về true nếu chúng giống nhau.
            onFilter: (value: any, record: any) => record.categoryId === value,
        },
        {
            title: 'Nút ấn',
            key: 'Nút ấn',
            render: (data: Iproduct) => (
                <Space size="middle">
                    <Button type='primary' ><Link style={{ textDecorationLine: 'none' }} to={`${data.id}/update`}>Update</Link></Button>
                    <Button type='primary' danger onClick={() => onHandleRemove(data.id)}>Detele</Button>
                </Space>
            ),
        },
    ];
    return (
        <div> <h2>Trang quản lí sản phẩm </h2>
            <Input.Search
                placeholder='Search here ...'
                style={{ width: 300, margin: 10 }}
                onSearch={onSearch}
            />
            <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 7 }} />
        </div>

    )
}
export default ProductManagementPage;