import React, { useState } from 'react';
import { Input, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Iproduct } from '../types/products';
const { Meta } = Card;

interface Iprops {
  products: Iproduct[];
  onRemove: (_id: number) => void;
}

const HomePage = (props: Iprops) => {
  const [searchText] = useState('');
  const data = props.products.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
      des: item.des,
      author: item.author,
      price: item.price,
    }
  });
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>Trang chủ </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',  }}>
        {filteredData.map((item) => (
          <Link to={`/products/${item.id}?name=${item.name}&price=${item.price}&des=${item.des}`} style={{textDecorationLine: "none"}}>
            <Card hoverable  style={{marginBottom: 10}}>
              <img alt="example" style={{ width: 245}} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
              <Meta style={{ textAlign: "center", marginTop: 10}} title={item.name}  />
              <Meta style={{ textAlign: "center", marginTop: 10 }}title={`Mô tả: ${item.des}`} />
              <Meta style={{ textAlign: "center", marginTop: 10 }} description={`Price: ${item.price}`}/>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
