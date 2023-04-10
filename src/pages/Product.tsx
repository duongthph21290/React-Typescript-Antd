import React, { useState } from 'react';
import { Input, Table } from 'antd';
import { Iproduct } from '../types/products';


interface Iprops {
    products: Iproduct[];
    onRemove: (_id: number) => void;
    id: Iproduct[];
}

const Products = (props : Iprops) => {
    const [searchText, setSearchText] = useState('');
    const data = props.products.map((item: any, index: number) => {
        return {
            key: index + 1,
            id: item.id,
            name: item.name,
            des: item.des,
            author: item.author,
            price: item.price
        }
    });

    //Tìm kiếm theo tên
    const onSearch = (value : string) => {
        setSearchText(value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );





    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả sản phẩm',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Tác giả sản phẩm',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
        },
    ];
    return (
        <div> <h2 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>All Products</h2>
            <Input.Search
                placeholder='Search here ...'
                style={{ width: 320, margin: 10, float: "right" }}
                onSearch={onSearch}
            />
            <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 10 }} />
        </div>

    )
}
export default Products;

