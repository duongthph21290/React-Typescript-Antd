import React, { useEffect, useState } from 'react';
//npm i react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { addProduct } from './api/product';
import HomePage from './pages/HomePage';
import Products from './pages/Product';
import Dashboard from './pages/admin/Dashboard';
import ProductManagementPage from './pages/admin/ProductManagement';
import AddProductPage from './pages/admin/AddProducts';
import WebsiteLayout from './pages/layout/WebsiteLayout'
import AdminLayout from './pages/layout/AdminLayout';
import UpdateProductPage from './pages/admin/UpdateProducts';
import Login from './pages/Login';
import Register from './pages/register';
import ProductDetailPage from './pages/ProductDetail';
import { Iproduct } from './types/products';
import AddCategory from './pages/admin/AddCategory';
import CategoryManagement from './pages/admin/CategoryManagement';


function App() {


  const [products, setProducts] = useState<Iproduct[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data.docs)
      })
  }, []);


  // Thêm ( add ):
  const onHandleAdd = (product: Iproduct) => {
    addProduct(product).then(() => {
      const data = [...products, product];
      setProducts(data);
    })
  };



  // Xóa ( delete ):
  const onHandleRemove = (id: Iproduct) => {
    fetch("http://localhost:8080/api/products/" + id, {
      method: "DELETE"
    }).then(() => setProducts(products.filter(item => item._id != id)))
  };




  // Update (Sửa)
  //  Hàm xử lý khi submit form update
  const onHandleUpdate = (product: Iproduct) => {
    console.log(product);
    fetch("http://localhost:8080/api/products/" + product._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    }).then(() => {
      const test = products.map(item => item._id == product._id ? product : item)
      setProducts(test);
    }
    )
  };





  return (
    <div className="App">
      {/* // Để trình duyệt có thể nhận ra được */}
      <BrowserRouter>
        <Routes>

          {/* Routes phía Client */}
          <Route path='/' element={<WebsiteLayout />}>
            <Route index element={<HomePage products={products} />} />
            {/* Đăng nhập, đăng kí */}
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='products'>
              <Route index element={<Products products={products} />} />
              <Route path=":id" element={<ProductDetailPage />} />
            </Route>
          </Route>



          {/* Routes của Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products">
              <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
              <Route path="add" element={<AddProductPage onAdd={onHandleAdd} />} />
              <Route path=":id/update" element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
            </Route>
            <Route path="category">
              <Route index element={<CategoryManagement/>} />
              <Route path="add" element={<AddCategory onAdd={onHandleAdd} />} />
              {/* <Route path=":id/update" element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;

