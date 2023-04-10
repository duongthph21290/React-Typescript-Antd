import React from 'react';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';

const { Meta } = Card;

// interface Iprops { }

// interface IqueryParams {
//   name: string;
//   price: string;
// }

const ProductDetailPage: React.FC<Iprops> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name') || '';
  const des = queryParams.get('des') || '';
  const price = Number(queryParams.get('price')) || 0;
  

  return (
    <Card hoverable style={{ maxWidth: 2000, textAlign: "center" }}>
      <h1 style={{marginTop: 10, marginBottom: 20}}>Chi tiết sản phẩm</h1>
      <img style={{ width: 350 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="product" />
      <Meta style={{ textAlign: "center", marginTop: 10 }} title={name} />
      <Meta style={{ textAlign: "center", marginTop: 10 }} title={`Mô tả: ${des}`} />
      <Meta style={{ textAlign: "center", marginTop: 10 }} description={`Price: ${price}`} />
    </Card>
  );
}
export default ProductDetailPage;
